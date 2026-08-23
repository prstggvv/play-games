export interface IFooterLink {
  label: string;
  sectionId: string;
}

export interface IFooterColumn {
  title: string;
  ariaLabel: string;
  links: IFooterLink[];
}

export const VK_LINK = 'https://vk.ru/id138932826';
export const VK_LABEL = 'VK';
export const TG_LINK = 'https://t.me/tennis1coachmoscow';
export const TG_LABEL = 'Telegram';

export const ABOUT_TEXT =
  'Детский теннисный клуб «Пироговский». Учим детей любить теннис — спокойно, по делу и с вниманием к каждому ребёнку. От первого касания ракетки до уверенной подачи.';

export const COPYRIGHT = '© 2026 Клуб «Пироговский»';


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
