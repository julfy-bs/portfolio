import type { Education } from '@/entities/education';
import type { Language } from '@/entities/language';
import type { Skill } from '@/entities/skill';

import { EducationCard } from './education-card';
import { LanguagesCard } from './languages-card';
import { SkillsCard } from './skills-card';
import styles from './resume-details.module.css';

export interface ResumeDetailsProps {
  readonly education?: readonly Education[];
  readonly languages?: readonly Language[];
  readonly skills?: readonly Skill[];
  readonly isLoading?: boolean;
}

/** Низ страницы опыта. Каждая карточка грузится сама по себе и не ждёт соседей. */
export function ResumeDetails({ education, languages, skills, isLoading }: ResumeDetailsProps) {
  return (
    <div className={styles.grid}>
      <EducationCard education={education} isLoading={isLoading} />
      <div className={styles.column}>
        <LanguagesCard languages={languages} isLoading={isLoading} />
        <SkillsCard skills={skills} isLoading={isLoading} />
      </div>
    </div>
  );
}
