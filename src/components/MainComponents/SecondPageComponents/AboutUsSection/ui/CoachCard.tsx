import { useRef } from 'react';
import cls from './AboutUsSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import {
  gsap,
  useGSAP,
  isMotionDisabled,
  splitLines,
  splitWords,
  revertSplits,
  wipeFrom,
  WIPE_TO,
  LINES_FROM,
  WORDS_FROM,
  EASE_EXPO,
  EASE_OUT,
  EASE_BACK,
  START_DEEP,
} from '../../../../../shared/lib/gsap';
import { useFontsReady } from '../../../../../shared/lib/hooks/useFontsReady';
import type { ICoach } from '../model/aboutUsItems';

interface ICoachCardProps {
  coach: ICoach;
}

export const CoachCard = ({ coach }: ICoachCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const notchRef = useRef<HTMLDivElement>(null);

  const isReversed = !!coach.reverse;
  const isFontsReady = useFontsReady();

  useGSAP(
    () => {
      if (!isFontsReady || isMotionDisabled()) return;

      const splits = [splitLines(nameRef.current), splitWords(descRef.current)];
      const [nameSplit, descSplit] = splits;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: START_DEEP,
          once: true,
        },
        onComplete: () => revertSplits(splits),
      });

      tl.fromTo(
        photoRef.current,
        { clipPath: wipeFrom(isReversed) },
        { clipPath: WIPE_TO, duration: 1.25, ease: EASE_EXPO },
        0,
      ).from(imgRef.current, { scale: 1.18, duration: 1.7, ease: EASE_EXPO }, 0);

      if (nameSplit) {
        tl.from(nameSplit.lines, LINES_FROM, 0.3);
      }

      if (descSplit) {
        tl.from(descSplit.words, WORDS_FROM, 0.62);
      }

      tl.from(
        notchRef.current,
        {
          opacity: 0,
          scale: 0.9,
          transformOrigin: isReversed ? 'left bottom' : 'right bottom',
          duration: 0.7,
          ease: EASE_BACK,
        },
        0.75,
      );

      return () => revertSplits(splits);
    },
    { scope: cardRef, dependencies: [isReversed, isFontsReady] },
  );

  useGSAP(
    () => {
      if (isMotionDisabled()) return;

      const card = cardRef.current;
      const img = imgRef.current;
      if (!card || !img) return;

      const scaleTo = gsap.quickTo(img, 'scale', { duration: 0.8, ease: EASE_OUT });
      const handleEnter = () => scaleTo(1.04);
      const handleLeave = () => scaleTo(1);

      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);

      return () => {
        card.removeEventListener('mouseenter', handleEnter);
        card.removeEventListener('mouseleave', handleLeave);
      };
    },
    { scope: cardRef },
  );

  return (
    <article
      ref={cardRef}
      className={classNames(cls.tcoach, { [cls.reverse]: isReversed }, [])}
    >
      <div className={classNames(cls.tcPanel, {}, [])}>
        <div className={classNames(cls.tcTop, {}, [])}>
          <h3 ref={nameRef} className={classNames(cls.tcName, {}, [])}>
            <span className={classNames(cls.n1, {}, [])}>{coach.surname}</span>
            <span className={classNames(cls.n2, {}, [])}>{coach.name}</span>
          </h3>
        </div>
        <p ref={descRef} className={classNames(cls.tcDesc, {}, [])}>
          {coach.desc}
        </p>
      </div>

      <div ref={photoRef} className={classNames(cls.tcPhoto, {}, [])}>
        <img
          className={classNames(cls.tcPhotoImg, {}, [])}
          ref={imgRef}
          src={coach.photo}
          alt={coach.alt} />
      </div>

      <div
        ref={notchRef}
        className={classNames(
          cls.tcNotch,
          { [cls.tcNotchBl]: isReversed, [cls.tcNotchBr]: !isReversed },
          [],
        )}
      >
        <a
          className={classNames(cls.tcCta, {}, [])}
          href={coach.ctaHref}
          aria-label={`${coach.ctaLabel} — ${coach.surname} ${coach.name}`}
        >
          <span className={classNames(cls.ctaFoot, {}, [])}>
            <span className={classNames(cls.ctaLabel, {}, [])}>{coach.ctaLabel}</span>
            <svg
              className={classNames(cls.ctaArrow, {}, [])}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        </a>
      </div>
    </article>
  );
};
