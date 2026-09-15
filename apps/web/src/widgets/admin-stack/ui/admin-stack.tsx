import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useCreateLanguageMutation,
  useDeleteLanguageMutation,
  useGetLanguagesAdminQuery,
  useUpdateLanguageMutation,
} from '@/entities/language';
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useGetSkillsAdminQuery,
  useUpdateSkillMutation,
} from '@/entities/skill';
import {
  useCreateTechnologyMutation,
  useDeleteTechnologyMutation,
  useGetTechnologiesAdminQuery,
  useUpdateTechnologyMutation,
  type UpdateTechnology,
} from '@/entities/technology';
import { useToaster } from '@/features/toaster';
import type { AppLanguage } from '@/shared/config';
import { ErrorState } from '@sutuzhko/ui-kit';

import {
  buildLangRows,
  buildSkillChips,
  buildTechCategories,
  buildTechChips,
  planSkillOrders,
  planTechOrders,
  rowToCreateLang,
  rowToUpdateLang,
  skillChipToCreate,
  techChipToCreate,
} from '../model/stack-form';

import { AdminStackSkeleton } from './admin-stack-skeleton';
import { AdminStackView, type StackDiff } from './admin-stack-view';

export interface AdminStackProps {
  /** Берётся из маршрута кабинета, в ней правятся названия языков и навыков. */
  readonly locale: AppLanguage;
}

/** При сохранении считает разницу с загруженными данными и отправляет все запросы разом. */
export function AdminStack({ locale }: AdminStackProps) {
  const { t } = useTranslation();
  const { notify } = useToaster();
  const techQuery = useGetTechnologiesAdminQuery();
  const langQuery = useGetLanguagesAdminQuery();
  const skillQuery = useGetSkillsAdminQuery();
  const [createTech] = useCreateTechnologyMutation();
  const [updateTech] = useUpdateTechnologyMutation();
  const [deleteTech] = useDeleteTechnologyMutation();
  const [createLang] = useCreateLanguageMutation();
  const [updateLang] = useUpdateLanguageMutation();
  const [deleteLang] = useDeleteLanguageMutation();
  const [createSkill] = useCreateSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  const [isSaving, setIsSaving] = useState(false);

  const save = async (diff: StackDiff): Promise<void> => {
    const catName = new Map(
      diff.techCategories.map((category) => [category.key, category.name.trim()]),
    );
    const techById = new Map((techQuery.data ?? []).map((tech) => [tech.id, tech]));
    const langById = new Map((langQuery.data ?? []).map((lang) => [lang.id, lang]));
    const skillById = new Map((skillQuery.data ?? []).map((skill) => [skill.id, skill]));
    // `order` меняем только у реально сдвинутых чипов. Если перенумеровывать соседей, одна
    // правка превращается в десятки PATCH. Бэкенд сортирует по `order`, пропуски ему не мешают.
    const techOrder = planTechOrders(diff.techCategories, diff.chips);
    setIsSaving(true);
    try {
      const ops: Promise<unknown>[] = [];
      for (const id of diff.deletedTechIds) ops.push(deleteTech(id).unwrap());
      for (const chip of diff.chips) {
        // Категория хранится в поле `category`, берём актуальное имя, ведь блок могли
        // переименовать. Чипы из безымянной категории не сохраняем.
        const category = catName.get(chip.categoryKey) ?? '';
        if (category === '') continue;
        const order = techOrder.get(chip.key) ?? 0;
        if (chip.id === null) {
          if (chip.name.trim() !== '')
            ops.push(createTech(techChipToCreate(chip, category, order)).unwrap());
        } else {
          const current = techById.get(chip.id);
          if (current) {
            const body: UpdateTechnology = {};
            if ((current.category ?? '') !== category) body.category = category;
            if (current.order !== order) body.order = order;
            if (body.category !== undefined || body.order !== undefined) {
              ops.push(updateTech({ id: chip.id, body }).unwrap());
            }
          }
        }
      }
      for (const id of diff.deletedLangIds) ops.push(deleteLang(id).unwrap());
      for (const row of diff.langRows) {
        if (row.id !== null) {
          const current = langById.get(row.id);
          if (current) {
            ops.push(
              updateLang({ id: row.id, body: rowToUpdateLang(row, current, locale) }).unwrap(),
            );
          }
        } else if (row.name.trim() !== '') {
          ops.push(createLang(rowToCreateLang(row, locale)).unwrap());
        }
      }
      for (const id of diff.deletedSkillIds) ops.push(deleteSkill(id).unwrap());
      // С навыками так же: экран «Опыт» сортирует их по `order`, поэтому трогаем только
      // сдвинутые, а новым позицию задаём при создании.
      const skillOrder = planSkillOrders(diff.skillChips);
      for (const chip of diff.skillChips) {
        const order = skillOrder.get(chip.key) ?? 0;
        if (chip.id === null) {
          if (chip.name.trim() !== '')
            ops.push(createSkill(skillChipToCreate(chip, locale, order)).unwrap());
        } else {
          const current = skillById.get(chip.id);
          if (current && current.order !== order) {
            ops.push(updateSkill({ id: chip.id, body: { order } }).unwrap());
          }
        }
      }
      await Promise.all(ops);
      notify({ type: 'success', title: t('admin.saved') });
    } catch {
      notify({ type: 'error', title: t('admin.saveError') });
    } finally {
      setIsSaving(false);
    }
  };

  if (techQuery.isError || langQuery.isError || skillQuery.isError) {
    return (
      <ErrorState
        message={t('admin.loadError')}
        onRetry={() => {
          void techQuery.refetch();
          void langQuery.refetch();
          void skillQuery.refetch();
        }}
      />
    );
  }

  if (
    techQuery.isLoading ||
    langQuery.isLoading ||
    skillQuery.isLoading ||
    techQuery.data === undefined ||
    langQuery.data === undefined ||
    skillQuery.data === undefined
  ) {
    return <AdminStackSkeleton />;
  }

  const categories = buildTechCategories(techQuery.data);
  const chips = buildTechChips(techQuery.data, categories);
  const langRows = buildLangRows(langQuery.data, locale);
  const skillChips = buildSkillChips(skillQuery.data, locale);
  // Ключ строим по содержимому, а не по id: после сохранения рефетч меняет данные, форма
  // монтируется заново чистой, и бар сохранения прячется.
  const signature = `${locale}|${JSON.stringify([techQuery.data, langQuery.data, skillQuery.data])}`;

  return (
    <AdminStackView
      key={signature}
      techCategories={categories}
      chips={chips}
      langRows={langRows}
      skillChips={skillChips}
      isBusy={isSaving}
      onSave={(diff) => void save(diff)}
    />
  );
}
