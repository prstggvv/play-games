export interface IPoint {
  x: number;
  y: number;
}

export type Side = 'right' | 'left' | 'center';

export interface ITimelineItem {
  year: string;
  role: string;
  meta: string;
  point: IPoint;
  progress: number;
  side: Side;
}

export const VIEWBOX_W = 1000;
export const VIEWBOX_H = 1400;
export const PATH_D =
  'M250 250 Q560 120 750 470 Q460 540 250 700 Q560 760 750 930 Q470 1010 500 1150';
export const NODE_FADE = 0.06;

export const TIMELINE: ITimelineItem[] = [
  {
    year: '2018 — 2020',
    role: 'Тренер по теннису, клуб Viccourt',
    meta: 'г. Евпатория',
    point: { x: 250, y: 250 },
    progress: 0.06,
    side: 'right',
  },
  {
    year: 'Июнь — июль 2019',
    role: 'Тренер Федерации тенниса России',
    meta: 'Международный детский центр «Артек»',
    point: { x: 750, y: 470 },
    progress: 0.28,
    side: 'left',
  },
  {
    year: '2021 — 2024',
    role: 'Тренер Федерации тенниса Республики Татарстан',
    meta: 'Казанская академия тенниса · дети от 3 до 5 лет',
    point: { x: 250, y: 700 },
    progress: 0.5,
    side: 'right',
  },
  {
    year: '2023 — 2024',
    role: 'Тренер экспериментальных групп',
    meta: 'Казанская академия тенниса · дети 2013–2017 годов рождения',
    point: { x: 750, y: 930 },
    progress: 0.72,
    side: 'left',
  },
  {
    year: 'С 2024 — по сей день',
    role: 'Тренер клуба «Пироговский»',
    meta: 'Работаем здесь сейчас — приходите знакомиться',
    point: { x: 500, y: 1150 },
    progress: 0.94,
    side: 'center',
  },
];
