export interface IHeroNavLink {
  label: string;
  sectionId: string;
}

export const HERO_NAV_LINKS: IHeroNavLink[] = [
  { label: 'О нас', sectionId: 'about' },
  { label: 'Тренеры', sectionId: 'coaches' },
  { label: 'Контакты', sectionId: 'contact' },
];
