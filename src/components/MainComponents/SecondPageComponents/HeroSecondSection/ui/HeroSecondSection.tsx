import { useRef } from 'react';
import cls from './HeroSecondSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { gsap, useGSAP, isMotionDisabled, EASE_OUT } from '../../../../../shared/lib/gsap';
import heroPhoto from '../../../../../shared/assets/images/secondPage/hero.jpg';
import {
  VK_LINK,
  TG_LINK,
  MAIL_LINK,
} from '../../../../../shared/lib/constants/index';

interface IHeroSecondSectionProps {
  className?: string;
}

export const HeroSecondSection = ({ className }: IHeroSecondSectionProps) => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (isMotionDisabled()) return;

      gsap.from(`.${cls.reveal}`, {
        opacity: 0,
        y: 22,
        duration: 0.7,
        delay: 0.1,
        stagger: 0.06,
        ease: EASE_OUT,
      });

      gsap.from(`.${cls.photoImg}`, {
        scale: 1.12,
        duration: 1.6,
        ease: EASE_OUT,
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className={classNames(cls.hero, {}, [className ?? ''])}
    >
      <div className={classNames(cls.card, {}, [])}>
        <div className={classNames(cls.photo, {}, [])}>
          <img
            className={classNames(cls.photoImg, {}, [])}
            src={heroPhoto}
            alt="Тренировка по теннису для детей"
          />
        </div>

        <div className={classNames(cls.tab, {}, [cls.tabTl])}>
          <div className={classNames(cls.logo, {}, [cls.reveal])}>
            <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4.5 6.5c4 3 4 10 0 13M21.5 6.5c-4 3-4 10 0 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className={classNames(cls.logoMark, {}, [])}>АЭ</span>
          </div>
        </div>

        <nav className={classNames(cls.tab, {}, [cls.tabTr])} aria-label="Навигация">
          <a
            className={classNames(cls.pill, {}, [cls.reveal])}
            href="#about"
            tabIndex={0}
            aria-label="О нас"
          >
            О нас
          </a>
          <a
            className={classNames(cls.pill, {}, [cls.reveal])}
            href="#about"
            tabIndex={0}
            aria-label="Тренеры"
          >
            Тренеры
          </a>
          <a
            className={classNames(cls.pill, {}, [cls.reveal])}
            href="#contact"
            tabIndex={0}
            aria-label="Контакты"
          >
            Контакты
          </a>
        </nav>

        <a
          className={classNames(cls.cta, {}, [cls.reveal])}
          href="https://vk.ru/id138932826"
          target='_blank'
          tabIndex={0}
          aria-label="Записаться на тренировку"
        >
          Записаться
        </a>

        <div className={classNames(cls.text, {}, [])}>
          <h1 className={classNames(cls.title, {}, [cls.reveal])}>
            <span className={classNames(cls.titleL1, {}, [])}>Большой теннис</span>
            <span className={classNames(cls.titleL2, {}, [])}>для маленьких</span>
          </h1>
          <p className={classNames(cls.sub, {}, [cls.reveal])}>
            Детский теннисный клуб. Внимание, терпение и игра — в каждой тренировке.
          </p>
        </div>

        <p className={classNames(cls.tagText, {}, [cls.reveal])}>
          Клуб «Пироговский» — записывайтесь на первую тренировку.
        </p>

        <div className={classNames(cls.tab, {}, [cls.tabBr])}>
          <div className={classNames(cls.soc, {}, [cls.reveal])}>
            <a
              className={classNames(cls.socLink, {}, [])}
              href={VK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
              aria-label="ВКонтакте"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.05 18.36c-6.03 0-9.9-4.13-10.05-11h3.03c.1 5.04 2.42 7.2 4.2 7.64V7.36h2.86v4.28c1.72-.18 3.53-2.11 4.14-4.28h2.85c-.47 2.66-2.4 4.59-3.77 5.38 1.37.64 3.57 2.33 4.42 5.62h-3.14c-.66-2.05-2.3-3.64-4.5-3.85v3.85h-.99z" />
              </svg>
            </a>
            <a
              className={classNames(cls.socLink, {}, [])}
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
              aria-label="Telegram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.94 4.66c.26-1.08-.79-1.94-1.8-1.53L2.7 10.05c-1.2.47-1.15 2.2.08 2.6l4.32 1.42 1.63 5.02c.2.63 1 .82 1.47.35l2.37-2.34 4.28 3.15c.7.51 1.7.13 1.88-.72l3.21-14.87zM7.7 13.1l8.9-5.48-6.95 6.32c-.16.15-.27.35-.31.57l-.32 2.26-1.32-3.67z" />
              </svg>
            </a>
            <a
              className={classNames(cls.socLink, {}, [])}
              href={MAIL_LINK}
              tabIndex={0}
              aria-label="Почта"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5.5" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4 7l8 5.5L20 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
