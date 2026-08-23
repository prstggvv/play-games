import sashaPhoto from '../../../../../shared/assets/images/secondPage/about/sasha.jpg';
import ernestPhoto from '../../../../../shared/assets/images/secondPage/about/ernest.jpg';

export interface ICoach {
  surname: string;
  name: string;
  desc: string;
  photo: string;
  alt: string;
  ctaLabel: string;
  ctaHref: string;
  reverse?: boolean;
}

export const aboutUsItems: ICoach[] = [
  {
    surname: 'Еркеева',
    name: 'Александра',
    desc: 'Внимание, терпение и игра — в каждой тренировке. Строит занятия так, чтобы ребёнок полюбил теннис и рос уверенно — от первого касания ракетки до уверенной подачи.',
    photo: sashaPhoto,
    alt: 'Еркеева Александра',
    ctaLabel: 'Образование',
    ctaHref: '#education',
  },
  {
    surname: 'Еркеев',
    name: 'Эрнест',
    desc: 'Опыт работы в федерациях и академиях — от «Артека» до Казани. Ставит технику и игровое мышление — от первых шагов на корте до соревновательного уровня.',
    photo: ernestPhoto,
    alt: 'Еркеев Эрнест',
    ctaLabel: 'Образование',
    ctaHref: '#education',
    reverse: true,
  },
];
