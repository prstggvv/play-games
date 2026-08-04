import { motion } from 'framer-motion';
import cls from './HeroSecondSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import heroPhoto from '../../../../../shared/assets/images/secondPage/hero.jpg';

interface IHeroSecondSectionProps {
  className?: string;
}

const VK_LINK = 'https://vk.com/ibolvan123';
const TG_LINK = 'https://t.me/';
const MAIL_LINK = 'mailto:club@yandex.ru';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
});

export const HeroSecondSection = ({ className }: IHeroSecondSectionProps) => {
  return (
    <section
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
          <motion.div className={classNames(cls.logo, {}, [])} {...fadeUp(0.1)}>
            <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4.5 6.5c4 3 4 10 0 13M21.5 6.5c-4 3-4 10 0 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className={classNames(cls.logoMark, {}, [])}>АЭ</span>
          </motion.div>
        </div>

        <nav className={classNames(cls.tab, {}, [cls.tabTr])} aria-label="Навигация">
          <motion.a
            className={classNames(cls.pill, {}, [])}
            href="#about"
            tabIndex={0}
            aria-label="О нас"
            {...fadeUp(0.16)}
          >
            О нас
          </motion.a>
          <motion.a
            className={classNames(cls.pill, {}, [])}
            href="#about"
            tabIndex={0}
            aria-label="Тренеры"
            {...fadeUp(0.22)}
          >
            Тренеры
          </motion.a>
          <motion.a
            className={classNames(cls.pill, {}, [])}
            href="#contact"
            tabIndex={0}
            aria-label="Контакты"
            {...fadeUp(0.28)}
          >
            Контакты
          </motion.a>
        </nav>

        <motion.a
          className={classNames(cls.cta, {}, [])}
          href="#contact"
          tabIndex={0}
          aria-label="Записаться на тренировку"
          {...fadeUp(0.34)}
        >
          Записаться
        </motion.a>

        <div className={classNames(cls.text, {}, [])}>
          <motion.h1 className={classNames(cls.title, {}, [])} {...fadeUp(0.4)}>
            <span className={classNames(cls.titleL1, {}, [])}>Большой теннис</span>
            <span className={classNames(cls.titleL2, {}, [])}>для маленьких</span>
          </motion.h1>
          <motion.p className={classNames(cls.sub, {}, [])} {...fadeUp(0.46)}>
            Детский теннисный клуб. Внимание, терпение и игра — в каждой тренировке.
          </motion.p>
        </div>

        <motion.p className={classNames(cls.tagText, {}, [])} {...fadeUp(0.52)}>
          Клуб «Пироговский» — записывайтесь на первую тренировку.
        </motion.p>

        <div className={classNames(cls.tab, {}, [cls.tabBr])}>
          <motion.div className={classNames(cls.soc, {}, [])} {...fadeUp(0.58)}>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
