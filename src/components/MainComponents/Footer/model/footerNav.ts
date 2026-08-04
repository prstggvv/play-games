export interface IFooterLink {
  label: string;
  sectionId: string;
}

export interface IFooterColumn {
  title: string;
  ariaLabel: string;
  links: IFooterLink[];
}

export const FOOTER_COLUMNS: IFooterColumn[] = [
  {
    title: 'Разделы',
    ariaLabel: 'Разделы',
    links: [
      { label: 'О нас', sectionId: 'about' },
      { label: 'Тренеры', sectionId: 'about' },
      { label: 'Путь на корте', sectionId: 'experience' },
      { label: 'Образование', sectionId: 'education' },
      { label: 'Контакты', sectionId: 'contact' },
    ],
  },
  {
    title: 'Тренеры',
    ariaLabel: 'Тренеры',
    links: [
      { label: 'Еркеева Александра', sectionId: 'about' },
      { label: 'Еркеев Эрнест', sectionId: 'about' },
      { label: 'Записаться', sectionId: 'contact' },
    ],
  },
];
