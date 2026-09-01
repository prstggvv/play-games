import { useRef } from 'react';
import cls from './WaySection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import {
  gsap,
  useGSAP,
  isReducedMotion,
  revealFadeUp,
} from '../../../../../shared/lib/gsap';
import TitleSecondPage from '../../../../../shared/ui/TitleSecondPage/TitleSecondPage';
import {
  type Side,
  VIEWBOX_W,
  VIEWBOX_H,
  PATH_D,
  NODE_FADE,
  TIMELINE,
} from '../model/waySectionConst';

interface IWaySection {
  className?: string;
}

const SIDE_CLASS: Record<Side, string> = {
  right: cls.stopRight,
  left: cls.stopLeft,
  center: cls.stopCenter,
};

export const WaySection = ({ className }: IWaySection) => {
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        gsap.utils.toArray<HTMLElement>(`.${cls.stop} .${cls.card}`).forEach((card) => {
          revealFadeUp(card, { y: 22, duration: 0.7 });
        });

        if (isReducedMotion()) {
          gsap.set(ballRef.current, { motionPath: { path: PATH_D, start: 0, end: 0 } });
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: fieldRef.current,
            start: 'top 80%',
            end: 'bottom 62%',
            scrub: 0.6,
          },
        });

        tl.fromTo(
          trailRef.current,
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: 1 },
          0,
        ).to(
          ballRef.current,
          { motionPath: { path: PATH_D }, duration: 1, immediateRender: true },
          0,
        );

        const nodes = gsap.utils.toArray<SVGGElement>(`.${cls.nodeGroup}`);

        nodes.forEach((node, index) => {
          const at = Math.max(0, TIMELINE[index].progress - NODE_FADE);

          tl.fromTo(
            node.querySelector(`.${cls.node}`),
            { opacity: 0.2 },
            { opacity: 1, duration: NODE_FADE },
            at,
          ).fromTo(
            node.querySelector(`.${cls.nodeRing}`),
            { opacity: 0 },
            { opacity: 0.55, duration: NODE_FADE },
            at,
          );
        });
      });

      mm.add('(max-width: 768px)', () => {
        revealFadeUp(`.${cls.item}`, {
          trigger: sectionRef.current,
          start: 'top 78%',
          y: 40,
          duration: 0.7,
          stagger: 0.12,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={classNames(cls.section, {}, [className ?? ''])}
    >
      <div className={classNames(cls.container, {}, [])}>
        <TitleSecondPage
          title='Путь на корте'
          subtitle='Семь лет тренерской работы — от детских лагерей Крыма до академий и клубов.'
          isWhite={true}
        />

        <div ref={fieldRef} className={classNames(cls.field, {}, [])} aria-hidden='true'>
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
            <path ref={trailRef} d={PATH_D} className={classNames(cls.routeTrail, {}, [])} />

            {TIMELINE.map((item) => (
              <g key={item.year} className={classNames(cls.nodeGroup, {}, [])}>
                <circle
                  cx={item.point.x}
                  cy={item.point.y}
                  r={16}
                  className={classNames(cls.nodeRing, {}, [])}
                />
                <circle
                  cx={item.point.x}
                  cy={item.point.y}
                  r={8}
                  className={classNames(cls.node, {}, [])}
                />
              </g>
            ))}

            <g ref={ballRef}>
              <circle r={22} className={classNames(cls.ballGlow, {}, [])} />
              <circle r={12} className={classNames(cls.ball, {}, [])} />
              <path d='M-8 -3 Q0 5 8 -3' className={classNames(cls.ballSeam, {}, [])} />
            </g>
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
                <div className={classNames(cls.card, {}, [])}>
                  <span className={classNames(cls.year, {}, [])}>{item.year}</span>
                  <span className={classNames(cls.role, {}, [])}>{item.role}</span>
                  <span className={classNames(cls.meta, {}, [])}>{item.meta}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ol className={classNames(cls.timeline, {}, [])}>
          {TIMELINE.map((item) => (
            <li key={item.year} className={classNames(cls.item, {}, [])}>
              <div className={classNames(cls.marker, {}, [])} aria-hidden='true'>
                <span className={classNames(cls.dot, {}, [])} />
              </div>

              <div className={classNames(cls.card, {}, [])}>
                <span className={classNames(cls.year, {}, [])}>{item.year}</span>
                <span className={classNames(cls.role, {}, [])}>{item.role}</span>
                <span className={classNames(cls.meta, {}, [])}>{item.meta}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
