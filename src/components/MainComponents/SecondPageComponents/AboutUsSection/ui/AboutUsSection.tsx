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
  LINES_FROM,
  WORDS_FROM,
  START,
} from '../../../../../shared/lib/gsap';
import { useFontsReady } from '../../../../../shared/lib/hooks/useFontsReady';
import { aboutUsItems } from '../model/aboutUsItems';
import { CoachCard } from './CoachCard';

interface IAboutUsSection {
  className?: string;
}

export const AboutUsSection = ({ className }: IAboutUsSection) => {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const isFontsReady = useFontsReady();

  useGSAP(
    () => {
      if (!isFontsReady || isMotionDisabled()) return;

      const splits = [splitLines(titleRef.current), splitWords(textRef.current)];
      const [titleSplit, textSplit] = splits;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: START,
          once: true,
        },
        onComplete: () => revertSplits(splits),
      });

      if (titleSplit) {
        tl.from(titleSplit.lines, LINES_FROM, 0);
      }

      if (textSplit) {
        tl.from(textSplit.words, WORDS_FROM, 0.38);
      }

      return () => revertSplits(splits);
    },
    { scope: rootRef, dependencies: [isFontsReady] },
  );

  return (
    <section
      ref={rootRef}
      id="about"
      className={classNames(cls.about, {}, [className ?? ''])}
    >
      <div className={classNames(cls.aboutFull, {}, [])}>
        <div className={classNames(cls.abIntro, {}, [])}>
          <h2 ref={titleRef} className={classNames(cls.abIntroTitle, {}, [])}>
            Два тренера —<br />одна команда.
          </h2>
          <p ref={textRef} className={classNames(cls.abIntroText, {}, [])}>
            Мы каждый день учим детей любить теннис — от первого касания ракетки
            до уверенной подачи.{' '}
            <span className={classNames(cls.hl, {}, [])}>
              Спокойно, по делу и с вниманием к каждому ребёнку.
            </span>
          </p>
        </div>

        <div className={classNames(cls.coaches, {}, [])}>
          {aboutUsItems.map((coach) => (
            <CoachCard key={coach.name} coach={coach} />
          ))}
        </div>
      </div>
    </section>
  );
};
