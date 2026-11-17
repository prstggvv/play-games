import { useRef } from 'react';
import cls from './HeroSecondSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { gsap, useGSAP, isMotionDisabled, EASE_OUT } from '../../../../../shared/lib/gsap';
import { handleSectionLinkClick } from '../../../../../shared/lib/scrollToSection/scrollToSection';
import { HERO_NAV_LINKS } from '../model/heroNav';
import heroPhoto from '../../../../../shared/assets/images/secondPage/hero.jpg';
import {
  VK_LINK,
  TG_LINK,
  MAIL_LINK,
} from '../../../../../shared/lib/constants/index';
import OutlookIcon from '../../../../../shared/ui/icons/OutlookIcon/OutlookIcon';
import TelegramIcon from '../../../../../shared/ui/icons/TelegramIcon/TelegramIcon';
import VkIcon from '../../../../../shared/ui/icons/VkIcon/VkIcon';

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
          {HERO_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              className={classNames(cls.pill, {}, [cls.reveal])}
              href={`#${link.sectionId}`}
              tabIndex={0}
              aria-label={link.label}
              onClick={(event) => handleSectionLinkClick(event, link.sectionId)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          className={classNames(cls.cta, {}, [cls.reveal])}
          href="https://vk.ru/id138932826"
          target='_blank'
          tabIndex={0}
          aria-label='Записаться на тренировку'
        >
          Записаться на курс
        </a>

        <div className={classNames(cls.text, {}, [])}>
          <h1 className={classNames(cls.title, {}, [cls.reveal])}>
            <span className={classNames(cls.titleL1, {}, [])}>Теннис</span>
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
              <VkIcon />
            </a>
            <a
              className={classNames(cls.socLink, {}, [])}
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
              aria-label="Telegram"
            >
              <TelegramIcon />
            </a>
            <a
              className={classNames(cls.socLink, {}, [])}
              href={MAIL_LINK}
              tabIndex={0}
              aria-label="Почта"
            >
              <OutlookIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
