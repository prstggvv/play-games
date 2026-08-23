import { useRef, type MouseEvent } from 'react';
import cls from './Footer.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { revealFadeUp, useGSAP } from '../../../../shared/lib/gsap';
import { scrollToSection } from '../../../../shared/lib/scrollToSection/scrollToSection';
import { FOOTER_COLUMNS } from '../model/footerNav';
import {
  ABOUT_TEXT,
  COPYRIGHT,
} from '../model/footerNav';
import {
  VK_LINK,
  VK_LABEL,
  TG_LINK,
  TG_LABEL,
} from '../../../../shared/lib/constants/index';


interface IFooterProps {
  className?: string;
}

export const Footer = ({ className }: IFooterProps) => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealFadeUp(`.${cls.revealItem}`, {
        trigger: rootRef.current,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
      });
    },
    { scope: rootRef },
  );

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer ref={rootRef} className={classNames(cls.footer, {}, [className ?? ''])}>
      <div className={classNames(cls.inner, {}, [])}>
        <div className={classNames(cls.about, {}, [cls.revealItem])}>
          <p className={classNames(cls.aboutText, {}, [])}>{ABOUT_TEXT}</p>

          <div className={classNames(cls.socials, {}, [])}>
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
              {VK_LABEL}
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
              {TG_LABEL}
            </a>
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav
            key={column.title}
            className={classNames(cls.col, {}, [cls.revealItem])}
            aria-label={column.ariaLabel}
          >
            <h4 className={classNames(cls.colTitle, {}, [])}>{column.title}</h4>
            <ul className={classNames(cls.colList, {}, [])}>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    className={classNames(cls.colLink, {}, [])}
                    href={`#${link.sectionId}`}
                    tabIndex={0}
                    onClick={(event) => handleNavClick(event, link.sectionId)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={classNames(cls.legal, {}, [])}>
        <div className={classNames(cls.legalRow, {}, [])}>
          <span className={classNames(cls.copy, {}, [])}>{COPYRIGHT}</span>
        </div>
      </div>
    </footer>
  );
};
