import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import cls from './WaySection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { VIEWPORT_ONCE } from '../../../../../shared/lib/motion';
import TitleSecondPage from '../../../../../shared/ui/TitleSecondPage/TitleSecondPage';

interface IWaySection {
  className?: string;
}

interface IPoint {
  x: number;
  y: number;
}

type Side = 'right' | 'left' | 'center';

interface ITimelineItem {
  year: string;
  role: string;
  meta: string;
  point: IPoint;
  progress: number;
  side: Side;
}

const VIEWBOX_W = 1000;
const VIEWBOX_H = 1400;

const PATH_D =
  'M250 250 Q560 120 750 470 Q460 540 250 700 Q560 760 750 930 Q470 1010 500 1150';

const TIMELINE: ITimelineItem[] = [
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

const SIDE_CLASS: Record<Side, string> = {
  right: cls.stopRight,
  left: cls.stopLeft,
  center: cls.stopCenter,
};

interface ICourtNodeProps {
  point: IPoint;
  progress: number;
  scrollYProgress: MotionValue<number>;
}

const CourtNode = ({ point, progress, scrollYProgress }: ICourtNodeProps) => {
  const opacity = useTransform(scrollYProgress, [progress - 0.06, progress], [0.2, 1]);
  const ringOpacity = useTransform(scrollYProgress, [progress - 0.06, progress], [0, 0.55]);

  return (
    <g>
      <motion.circle
        cx={point.x}
        cy={point.y}
        r={16}
        className={classNames(cls.nodeRing, {}, [])}
        style={{ opacity: ringOpacity }}
      />
      <motion.circle
        cx={point.x}
        cy={point.y}
        r={8}
        className={classNames(cls.node, {}, [])}
        style={{ opacity }}
      />
    </g>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.36, 1] as const },
  },
};

export const WaySection = ({ className }: IWaySection) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: fieldRef,
    offset: ['start 0.8', 'end 0.62'],
  });

  const ballDistance = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className={classNames(cls.section, {}, [className ?? ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <TitleSecondPage
          title='Путь на корте'
          subtitle='Семь лет тренерской работы — от детских лагерей Крыма до академий и клубов.'
          isWhite={true}
        />

        <div ref={fieldRef} className={classNames(cls.field, {}, [])}>
          <svg
            className={classNames(cls.svg, {}, [])}
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            preserveAspectRatio='xMidYMid meet'
            aria-hidden='true'
          >
            <rect x={130} y={70} width={740} height={1260} rx={4} className={classNames(cls.courtLine, {}, [])} />
            <line x1={210} y1={70} x2={210} y2={1330} className={classNames(cls.courtLine, {}, [])} />
            <line x1={790} y1={70} x2={790} y2={1330} className={classNames(cls.courtLine, {}, [])} />
            <line x1={210} y1={470} x2={790} y2={470} className={classNames(cls.courtLine, {}, [])} />
            <line x1={210} y1={930} x2={790} y2={930} className={classNames(cls.courtLine, {}, [])} />
            <line x1={500} y1={470} x2={500} y2={930} className={classNames(cls.courtLine, {}, [])} />
            <line x1={490} y1={70} x2={510} y2={70} className={classNames(cls.courtLine, {}, [])} />
            <line x1={490} y1={1330} x2={510} y2={1330} className={classNames(cls.courtLine, {}, [])} />
            <line x1={95} y1={700} x2={905} y2={700} className={classNames(cls.courtNet, {}, [])} />

            <path d={PATH_D} className={classNames(cls.routeGhost, {}, [])} />
            <motion.path
              d={PATH_D}
              className={classNames(cls.routeTrail, {}, [])}
              style={{ pathLength: scrollYProgress }}
            />

            {TIMELINE.map((item) => (
              <CourtNode
                key={item.year}
                point={item.point}
                progress={item.progress}
                scrollYProgress={scrollYProgress}
              />
            ))}

            <motion.g style={{ offsetPath: `path("${PATH_D}")`, offsetDistance: ballDistance }}>
              <circle r={22} className={classNames(cls.ballGlow, {}, [])} />
              <circle r={12} className={classNames(cls.ball, {}, [])} />
              <path d='M-8 -3 Q0 5 8 -3' className={classNames(cls.ballSeam, {}, [])} />
            </motion.g>
          </svg>

          <ul className={classNames(cls.stops, {}, [])}>
            {TIMELINE.map((item) => (
              <li
                key={item.year}
                className={classNames(cls.stop, {}, [SIDE_CLASS[item.side]])}
                style={{
                  left: `${(item.point.x / VIEWBOX_W) * 100}%`,
                  top: `${(item.point.y / VIEWBOX_H) * 100}%`,
                }}
              >
                <motion.div
                  className={classNames(cls.card, {}, [])}
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  viewport={VIEWPORT_ONCE}
                >
                  <span className={classNames(cls.year, {}, [])}>{item.year}</span>
                  <span className={classNames(cls.role, {}, [])}>{item.role}</span>
                  <span className={classNames(cls.meta, {}, [])}>{item.meta}</span>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
