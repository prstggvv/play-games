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
import TitleSecondPage from '../../../../../shared/ui/TitleSecondPage/TitleSecondPage';
import {
  TEACHERS,
  WAVE_SPREAD,
  DRAW_DURATION,
  FILL_AT,
  FILL_DURATION,
  LINES_AT,
  LINE_HIDDEN,
  LINE_SHOWN,
  type MetaIcon,
} from '../model/educationConsts';

interface IEducationProps {
  className?: string;
}

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
