import sashaPhoto from '../../../../../shared/assets/images/secondPage/about/sasha.jpg';
import ernestPhoto from '../../../../../shared/assets/images/secondPage/about/ernest.jpg';

export interface ICoach {
  id: string;
  surname: string;
  surnameAlt?: string;
  name: string;
  desc: string;
  photo: string;
  alt: string;
  ctaLabel: string;
  ctaSectionId: string;
  reverse?: boolean;
}

export const aboutUsItems: ICoach[] = [
  {
    id: 'coach-alexandra',
    surname: 'Еркеева',
    surnameAlt: 'Чернышева',
    name: 'Александра',
    desc: 'Тренер и спортивный психолог - с опытом работы от «Артека» до Казани. Бакалавр физической культуры ПГУФКСиТ, магистратура «Спорт», курсы Федерации тенниса России. Работает с самыми младшими: помогает справиться с волнением, поверить в себя и полюбить корт.',
    photo: sashaPhoto,
    alt: 'Еркеева (Чернышева) Александра',
    ctaLabel: 'Образование',
    ctaSectionId: 'education',
  },
  {
    id: 'coach-ernest',
    surname: 'Еркеев',
    name: 'Эрнест',
    desc: 'Тренер с опытом работы в федерациях и академиях. Выпускник РГУФКСиТ, прошёл курсы Федерации тенниса России до Level 1. Ставит технику и игровое мышление — от первых шагов на корте до соревновательного уровня.',
    photo: ernestPhoto,
    alt: 'Еркеев Эрнест',
    ctaLabel: 'Образование',
    ctaSectionId: 'education',
    reverse: true,
  },
];
