import { useRef } from 'react';
import cls from './ContactSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import {
  gsap,
  useGSAP,
  isMotionDisabled,
  revealFadeUp,
} from '../../../../../shared/lib/gsap';
import contactPhoto from '../../../../../shared/assets/images/secondPage/hero.jpg';

interface IContactSection {
  className?: string;
}

const VK_LINK = 'https://vk.com/ibolvan123';
const TG_LINK = 'https://t.me/';
const PHONE_LINK = 'tel:+70000000000';
const PHONE_LABEL = '+7 000 000-00-00';
const MAIL_LINK = 'mailto:club@yandex.ru';
const MAIL_LABEL = 'club@yandex.ru';

export const ContactSection = ({ className }: IContactSection) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      revealFadeUp(`.${cls.revealItem}`, {
        trigger: sectionRef.current,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
      });

      if (isMotionDisabled()) return;

      gsap.fromTo(
        bgRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={classNames(cls.section, {}, [className ?? ''])}
    >
      <div ref={bgRef} className={classNames(cls.bg, {}, [])}>
        <img
          className={classNames(cls.bgImg, {}, [])}
          src={contactPhoto}
          alt="Тренер и юная теннисистка на корте"
        />
      </div>

      <div className={classNames(cls.scrim, {}, [])} aria-hidden="true" />

      <div className={classNames(cls.inner, {}, [])}>
        <div className={classNames(cls.kicker, {}, [cls.revealItem])}>
          <span className={classNames(cls.rule, {}, [])} />
          <span>Контакты</span>
        </div>

        <h2 className={classNames(cls.title, {}, [cls.revealItem])}>
          Давай
          <br />
          <span className={classNames(cls.accent, {}, [])}>знакомиться</span>
        </h2>

        <p className={classNames(cls.sub, {}, [cls.revealItem])}>
          Ответим на все вопросы и подберём удобное время для первой тренировки. Дети от 3 лет.
        </p>

        <div className={classNames(cls.socials, {}, [cls.revealItem])}>
          <a
            className={classNames(cls.socLink, {}, [])}
            href={VK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={0}
            aria-label="ВКонтакте"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.79 18.5c-6.55 0-10.29-4.5-10.45-11.96h3.29c.11 5.48 2.52 7.8 4.43 8.28V6.54h3.1v4.73c1.89-.2 3.87-2.36 4.54-4.73h3.1c-.51 2.92-2.66 5.08-4.19 5.96 1.53.72 3.97 2.62 4.9 6h-3.41c-.73-2.11-2.54-3.75-4.94-3.99v3.99h-.37z" />
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
              <path d="M21.9 4.6 18.6 19.8c-.25 1.07-.9 1.34-1.82.83l-5.03-3.71-2.43 2.34c-.27.27-.49.49-1.01.49l.36-5.12 9.32-8.42c.4-.36-.09-.56-.63-.2L5.84 13.2.9 11.66c-1.07-.34-1.09-1.07.22-1.59L20.5 2.7c.9-.33 1.68.2 1.4 1.9z" />
            </svg>
          </a>
        </div>

        <div className={classNames(cls.lines, {}, [cls.revealItem])}>
          <a className={classNames(cls.line, {}, [])} href={PHONE_LINK} tabIndex={0} aria-label="Позвонить">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {PHONE_LABEL}
          </a>
          <a className={classNames(cls.line, {}, [])} href={MAIL_LINK} tabIndex={0} aria-label="Написать на почту">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
              <path d="M4 7l8 5.5L20 7" />
            </svg>
            {MAIL_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
};
