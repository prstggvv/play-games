import sashaPhoto from '../../../../../shared/assets/images/secondPage/about/sasha.jpg';
import ernestPhoto from '../../../../../shared/assets/images/secondPage/about/ernest.jpg';

export type MetaIcon = 'org' | 'fed' | 'date' | 'psych';

export interface IMetaRow {
  icon?: MetaIcon;
  code?: boolean;
  text: string;
}

export type CardSpan = 'wide' | 'full';

export interface IEduCard {
  year: string;
  noYear?: boolean;
  kind: string;
  title: string;
  span?: CardSpan;
  meta: IMetaRow[];
}

export interface ITeacher {
  id: string;
  kicker: string;
  name: string;
  avatar: string;
  cards: IEduCard[];
}

export const TEACHERS: ITeacher[] = [
  {
    id: 'a',
    kicker: 'Тренер',
    name: 'Александра',
    avatar: sashaPhoto,
    cards: [
      {
        year: '2021',
        kind: 'Бакалавриат',
        title: 'Физическая культура',
        span: 'wide',
        meta: [
          { code: true, text: '49.03.01' },
          { icon: 'org', text: 'ПГУФКСиТ' },
          { icon: 'date', text: '7 июля 2021' },
        ],
      },
      {
        year: '2022',
        kind: 'Курс RTF',
        title: 'Entry Level Coaches Course: Play Tennis & Tennis 10’s',
        meta: [
          { icon: 'fed', text: 'Федерация тенниса России' },
          { icon: 'date', text: '30 мая 2022' },
        ],
      },
      {
        year: '—',
        noYear: true,
        kind: 'Квалификация',
        title: 'RTF Level 1 — слушатель',
        meta: [{ icon: 'fed', text: 'Федерация тенниса России' }],
      },
      {
        year: '—',
        noYear: true,
        kind: 'Магистратура',
        title: 'Спорт',
        span: 'wide',
        meta: [
          { code: true, text: '49.04.03' },
          { icon: 'org', text: 'ПГУФКСиТ' },
        ],
      },
      {
        year: '2025',
        kind: 'Переподготовка',
        title: 'Психолог-консультант',
        span: 'full',
        meta: [
          { icon: 'psych', text: 'Спортивная психология' },
          { icon: 'date', text: '20 февраля 2025' },
        ],
      },
    ],
  },
  {
    id: 'e',
    kicker: 'Тренер',
    name: 'Эрнест',
    avatar: ernestPhoto,
    cards: [
      {
        year: '2009',
        kind: 'Высшее',
        title: 'Высшее образование',
        span: 'wide',
        meta: [{ icon: 'org', text: 'РГУФКСиТ' }],
      },
      {
        year: '2022',
        kind: 'Курс RTF',
        title: 'Entry Level Coaches Course: Play Tennis & Tennis 10s',
        meta: [{ icon: 'fed', text: 'Федерация тенниса России' }],
      },
      {
        year: '2023',
        kind: 'Курс RTF',
        title: 'Level 1 Coaches Course: Coaching Beginner and Intermediate Players',
        span: 'full',
        meta: [
          { icon: 'fed', text: 'Федерация тенниса России' },
          { icon: 'date', text: '1 мая 2023' },
        ],
      },
    ],
  },
];

export const WAVE_SPREAD = 0.5;
export const DRAW_DURATION = 0.5;
export const FILL_AT = 0.26;
export const FILL_DURATION = 0.45;
export const LINES_AT = 0.42;
export const LINE_HIDDEN = 'inset(-12% 100% -12% 0%)';
export const LINE_SHOWN = 'inset(-12% -3% -12% 0%)';
