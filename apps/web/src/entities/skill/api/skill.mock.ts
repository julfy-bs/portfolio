import { http, HttpResponse } from 'msw';

import { env, normalizeLanguage } from '@/shared/config';
import type { AppLanguage } from '@/shared/config';

import type { CreateSkill, Skill, SkillAdmin, UpdateSkill } from '../model/types';

// Навыки это технические токены, в обеих локалях они одинаковы (в seed en = ru).
const SKILL_NAMES = [
  'REST API',
  'Accessibility',
  'CI/CD',
  'Docker',
  'Storybook',
  'Testing',
  'Design Systems',
  'Performance',
  'Git',
];

function buildInitial(): SkillAdmin[] {
  return SKILL_NAMES.map((name, index) => ({
    id: String(index),
    name: { ru: name, en: name },
    order: index,
  }));
}

// Публичный список и админ-CRUD работают с одним состоянием, чтобы правки из кабинета
// сразу были видны на экране «Опыт», как с реальным бэкендом.
let skills: SkillAdmin[] = buildInitial();
let nextId = skills.length;

/** Сбрасывает навыки мока, чтобы тесты не зависели друг от друга. */
export function resetMockSkills(): void {
  skills = buildInitial();
  nextId = skills.length;
}

// Локализация как на бэкенде: для en фолбэк на ru.
function toPublic(skill: SkillAdmin, language: AppLanguage): Skill {
  return {
    id: skill.id,
    name: (language === 'en' ? skill.name.en : skill.name.ru) ?? skill.name.ru,
  };
}

export const mockSkills: Skill[] = buildInitial().map((skill) => toPublic(skill, 'ru'));

export const mockSkillsAdmin: SkillAdmin[] = buildInitial();

/** Локаль берётся из `Accept-Language`. */
export const skillHandlers = [
  http.get(`${env.apiBaseUrl}/skills`, ({ request }) => {
    const language = normalizeLanguage(request.headers.get('Accept-Language') ?? undefined);
    return HttpResponse.json(
      [...skills].sort((a, b) => a.order - b.order).map((skill) => toPublic(skill, language)),
    );
  }),
];

export const skillAdminHandlers = [
  http.get(`${env.apiBaseUrl}/skills/admin`, () =>
    HttpResponse.json([...skills].sort((a, b) => a.order - b.order)),
  ),
  http.post<Record<string, never>, CreateSkill>(`${env.apiBaseUrl}/skills`, async ({ request }) => {
    const body = await request.json();
    nextId += 1;
    const created: SkillAdmin = {
      id: String(nextId),
      name: { ru: body.name.ru, en: body.name.en ?? null },
      order: body.order ?? skills.length,
    };
    skills.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),
  http.patch<{ id: string }, UpdateSkill>(
    `${env.apiBaseUrl}/skills/:id`,
    async ({ request, params }) => {
      const body = await request.json();
      const skill = skills.find((item) => item.id === params.id);
      if (skill === undefined) return new HttpResponse(null, { status: 404 });
      // Имя перезаписываем целиком, как writeText на бэке: фронт шлёт обе локали.
      if (body.name !== undefined) {
        skill.name = { ru: body.name.ru ?? skill.name.ru, en: body.name.en ?? skill.name.en };
      }
      if (body.order !== undefined) skill.order = body.order;
      return HttpResponse.json(skill);
    },
  ),
  http.delete(`${env.apiBaseUrl}/skills/:id`, ({ params }) => {
    skills = skills.filter((item) => item.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];
