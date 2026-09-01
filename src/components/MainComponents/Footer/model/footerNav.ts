export interface IFooterLink {
  label: string;
  sectionId: string;
}

export const ABOUT_TEXT =
  'Детский теннисный клуб «Пироговский». Учим детей любить теннис — спокойно, по делу и с вниманием к каждому ребёнку. От первого касания ракетки до уверенной подачи.';

export const COPYRIGHT = '© 2026 Клуб «Пироговский»';

export const FOOTER_LINKS: IFooterLink[] = [
  { label: 'О нас', sectionId: 'about' },
  { label: 'Тренеры', sectionId: 'coaches' },
  { label: 'Еркеева Александра', sectionId: 'coach-alexandra' },
  { label: 'Еркеев Эрнест', sectionId: 'coach-ernest' },
  { label: 'Путь на корте', sectionId: 'experience' },
  { label: 'Образование', sectionId: 'education' },
  { label: 'Контакты', sectionId: 'contact' },
  { label: 'Записаться', sectionId: 'contact' },
];
