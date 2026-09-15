import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import type { ProjectListItem } from '@/entities/project';

import { useProjectFilter, type ProjectFilter } from './model/use-project-filter';
import { ProjectFilterBar } from './ui/project-filter-bar';

function makeProject(overrides: Partial<ProjectListItem>): ProjectListItem {
  return {
    slug: 'project',
    title: 'Project',
    description: 'Description',
    subtitle: null,
    category: null,
    period: null,
    tileColor: null,
    pinned: false,
    runnable: false,
    runCommand: null,
    embedUrl: null,
    primaryLanguage: null,
    technologies: [],
    contributors: [],
    ...overrides,
  };
}

const projects: ProjectListItem[] = [
  makeProject({
    slug: 'procharity',
    title: 'Procharity',
    technologies: ['TypeScript', 'React', 'SCSS'],
    contributors: [{ name: 'Богдан', image: null, color: '#238636', link: null }],
  }),
  makeProject({
    slug: 'deep-focus',
    title: 'Deep Focus',
    technologies: ['Vue', 'Node'],
    contributors: [{ name: 'Гвозденков', image: null, color: '#db6d28', link: null }],
  }),
];

// Панель управляемая, поэтому в обёртке подключаем её к `useProjectFilter`.
function FilterHarness() {
  const filter = useProjectFilter(projects);
  return <ProjectFilterBar filter={filter} />;
}

// Проекты ещё грузятся, опций нет, панель в режиме isLoading.
function LoadingHarness() {
  const filter = useProjectFilter([]);
  return <ProjectFilterBar filter={filter} isLoading />;
}

// Проп `filter` обязателен по типу истории, но настоящий контроллер подставляет
// `FilterHarness` в `render`, так что это значение не используется.
const staticFilter: ProjectFilter = {
  state: { query: '', techs: [], contributors: [] },
  filtered: projects,
  techOptions: [],
  contributorOptions: [],
  hasFilters: false,
  sortKey: 'default',
  setSortKey: () => undefined,
  setQuery: () => undefined,
  toggleTech: () => undefined,
  toggleContributor: () => undefined,
  clear: () => undefined,
};

const meta = {
  title: 'Features/ProjectFilter',
  component: ProjectFilterBar,
  parameters: { layout: 'padded', controls: { disable: true } },
  args: { filter: staticFilter },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}>{Story()}</div>],
  render: () => <FilterHarness />,
} satisfies Meta<typeof ProjectFilterBar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Песочница с поиском и фасетами технологий и контрибьюторов. */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('searchbox')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'React' })).toBeInTheDocument();
  },
};

/** Пока проекты грузятся, вместо чипов скелетоны. */
export const Loading: Story = {
  name: 'Загрузка (скелетон)',
  render: () => <LoadingHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Чипов ещё нет, есть только поиск и плейсхолдеры.
    await expect(canvas.queryByRole('button', { name: 'React' })).not.toBeInTheDocument();
  },
};

/** Ввод в поиск и переключение фасета, после чего появляется сброс. */
export const Filtering: Story = {
  name: 'Живая фильтрация',
  render: () => <FilterHarness />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByRole('searchbox');
    await userEvent.type(search, 'focus');
    await expect(search).toHaveValue('focus');

    const chip = canvas.getByRole('button', { name: 'React' });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
  },
};
