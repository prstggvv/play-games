import { useMemo, useRef, useState } from 'react';
import cls from './Education.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import {
  gsap,
  useGSAP,
  isMotionDisabled,
  revealFadeUp,
  scrollOnce,
  wipeFrom,
  WIPE_TO,
  START,
  EASE_OUT,
  EASE_SOFT,
  EASE_EXPO,
} from '../../../../../shared/lib/gsap';
import sashaPhoto from '../../../../../shared/assets/images/secondPage/about/sasha.jpg';
import ernestPhoto from '../../../../../shared/assets/images/secondPage/about/ernest.jpg';
import TitleSecondPage from '../../../../../shared/ui/TitleSecondPage/TitleSecondPage';

interface IEducationProps {
  className?: string;
}

type MetaIcon = 'org' | 'fed' | 'date' | 'psych';

interface IMetaRow {
  icon?: MetaIcon;
  code?: boolean;
  text: string;
}

type CardSpan = 'wide' | 'full';

interface IEduCard {
  year: string;
  noYear?: boolean;
  kind: string;
  title: string;
  span?: CardSpan;
  meta: IMetaRow[];
}

interface ITeacher {
  id: string;
  kicker: string;
  name: string;
  avatar: string;
  cards: IEduCard[];
}

const TEACHERS: ITeacher[] = [
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

const WAVE_SPREAD = 0.5;
const DRAW_DURATION = 0.5;
const FILL_AT = 0.26;
const FILL_DURATION = 0.45;
const LINES_AT = 0.42;
const LINE_HIDDEN = 'inset(-12% 100% -12% 0%)';
const LINE_SHOWN = 'inset(-12% -3% -12% 0%)';

const MetaIconSvg = ({ icon }: { icon: MetaIcon }) => {
  if (icon === 'org') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 10-10-5L2 10l10 5 10-5Z" />
        <path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
      </svg>
    );
  }

  if (icon === 'fed') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M6 9a6 6 0 0 0 12 0M6 9V4h12v5M8 21h8m-4-4v4" />
      </svg>
    );
  }

  if (icon === 'psych') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
};

export const Education = ({ className }: IEducationProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const [activeId, setActiveId] = useState(TEACHERS[0].id);

  const activeTeacher = useMemo(
    () => TEACHERS.find((teacher) => teacher.id === activeId) ?? TEACHERS[0],
    [activeId],
  );

  useGSAP(
    () => {
      revealFadeUp(`.${cls.revealItem}`, {
        trigger: rootRef.current,
        y: 32,
        duration: 0.7,
        stagger: 0.12,
      });
    },
    { scope: rootRef },
  );

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid || isMotionDisabled()) return;

      const cards = gsap.utils.toArray<HTMLElement>(`.${cls.card}`, grid);
      if (!cards.length) return;

      const gridRect = grid.getBoundingClientRect();
      const gridWidth = Math.max(gridRect.width, 1);
      const gridHeight = Math.max(gridRect.height, 1);

      const offsets = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        const x = (rect.left - gridRect.left) / gridWidth;
        const y = (rect.top - gridRect.top) / gridHeight;

        return x + y;
      });

      const maxOffset = Math.max(...offsets, 0.001);
      const timeline = gsap.timeline({ scrollTrigger: scrollOnce(grid, START) });

      cards.forEach((card, index) => {
        const frame = card.querySelector<SVGRectElement>(`.${cls.frameRect}`);
        const surface = card.querySelector<HTMLElement>(`.${cls.surface}`);
        const lines = gsap.utils.toArray<HTMLElement>(`.${cls.line}`, card);
        const at = (offsets[index] / maxOffset) * WAVE_SPREAD;

        gsap.set(frame, { drawSVG: '0% 0%', opacity: 0 });
        gsap.set(surface, { clipPath: wipeFrom(false) });
        gsap.set(lines, { clipPath: LINE_HIDDEN });

        timeline
          .set(frame, { opacity: 1 }, at)
          .to(
            frame,
            { drawSVG: '0% 100%', duration: DRAW_DURATION, ease: 'power2.inOut' },
            at,
          )
          .to(
            surface,
            { clipPath: WIPE_TO, duration: FILL_DURATION, ease: EASE_EXPO },
            at + FILL_AT,
          )
          .to(
            frame,
            { opacity: 0, duration: 0.4, ease: EASE_SOFT },
            at + DRAW_DURATION,
          )
          .to(
            lines,
            {
              clipPath: LINE_SHOWN,
              duration: 0.4,
              stagger: 0.05,
              ease: EASE_OUT,
            },
            at + LINES_AT,
          );
      });
    },
    { scope: gridRef, dependencies: [activeId] },
  );

  const handleSelect = (id: string) => () => {
    setActiveId(id);
  };

  const handleKeyDown = (id: string) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setActiveId(id);
  };

  return (
    <section
      ref={rootRef}
      id="education"
      className={classNames(cls.section, {}, [className ?? ''])}
    >
      <div className={classNames(cls.container, {}, [])}>
        <TitleSecondPage
          title='Дипломы и квалификация'
          subtitle='Выберите тренера, чтобы посмотреть его образование, курсы и сертификаты.'
          isWhite={false}
        />

        <div
          className={classNames(cls.tabs, {}, [cls.revealItem])}
          role="tablist"
          aria-label="Выбор тренера"
        >
          {TEACHERS.map((teacher) => {
            const isActive = teacher.id === activeId;

            return (
              <button
                key={teacher.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Образование тренера ${teacher.name}`}
                tabIndex={0}
                className={classNames(cls.tab, { [cls.tabActive]: isActive }, [])}
                onClick={handleSelect(teacher.id)}
                onKeyDown={handleKeyDown(teacher.id)}
              >
                <span className={classNames(cls.av, {}, [])}>
                  <img src={teacher.avatar} alt={teacher.name} />
                </span>
                <span className={classNames(cls.tabMeta, {}, [])}>
                  <span className={classNames(cls.kicker, {}, [])}>{teacher.kicker}</span>
                  <span className={classNames(cls.nm, {}, [])}>{teacher.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className={classNames(cls.counter, {}, [cls.revealItem])}>
          <span className={classNames(cls.num, {}, [])}>{activeTeacher.cards.length}</span>
          <span className={classNames(cls.lbl, {}, [])}>
            документов · {activeTeacher.name}
          </span>
        </div>

        <ul ref={gridRef} className={classNames(cls.grid, {}, [])}>
          {activeTeacher.cards.map((card) => (
            <li
              key={card.title}
              className={classNames(cls.card, {
                [cls.wide]: card.span === 'wide',
                [cls.full]: card.span === 'full',
              }, [])}
            >
              <svg className={classNames(cls.frame, {}, [])} aria-hidden="true" focusable="false">
                <rect className={classNames(cls.frameRect, {}, [])} x="0" y="0" width="100%" height="100%" />
              </svg>

              <span className={classNames(cls.surface, {}, [])} aria-hidden="true" />

              <div className={classNames(cls.cardHead, {}, [cls.line])}>
                <span className={classNames(cls.kind, {}, [])}>{card.kind}</span>
                {!card.noYear ? (
                  <span className={classNames(cls.year, {}, [])}>{card.year}</span>
                ) : null}
              </div>

              <h3 className={classNames(cls.cardTitle, {}, [cls.line])}>{card.title}</h3>

              <div className={classNames(cls.meta, {}, [])}>
                {card.meta.map((row) => (
                  <div
                    key={row.text}
                    className={classNames(cls.row, { [cls.code]: !!row.code }, [cls.line])}
                  >
                    {row.icon ? <MetaIconSvg icon={row.icon} /> : null}
                    {row.text}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
