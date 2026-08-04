import type { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import cls from './Footer.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { createStaggerContainer, itemReveal, VIEWPORT_ONCE } from '../../../../shared/lib/motion';
import { scrollToSection } from '../../../../shared/lib/scrollToSection/scrollToSection';
import { FOOTER_COLUMNS } from '../model/footerNav';

interface IFooterProps {
  className?: string;
}

const VK_LINK = 'https://vk.com/ibolvan123';
const VK_LABEL = 'vk.com/ibolvan123';
const TG_LINK = 'https://t.me/';
const TG_LABEL = 'Telegram';

const ABOUT_TEXT =
  'Детский теннисный клуб «Пироговский». Учим детей любить теннис — спокойно, по делу и с вниманием к каждому ребёнку. От первого касания ракетки до уверенной подачи.';

const COPYRIGHT = '© 2026 Клуб «Пироговский»';

const container = createStaggerContainer(0.12);

export const Footer = ({ className }: IFooterProps) => {
  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className={classNames(cls.footer, {}, [className ?? ''])}>
      <motion.div
        className={classNames(cls.inner, {}, [])}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <motion.div className={classNames(cls.about, {}, [])} variants={itemReveal}>
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
        </motion.div>

        {FOOTER_COLUMNS.map((column) => (
          <motion.nav
            key={column.title}
            className={classNames(cls.col, {}, [])}
            aria-label={column.ariaLabel}
            variants={itemReveal}
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
          </motion.nav>
        ))}
      </motion.div>

      <div className={classNames(cls.legal, {}, [])}>
        <div className={classNames(cls.legalRow, {}, [])}>
          <span className={classNames(cls.copy, {}, [])}>{COPYRIGHT}</span>
        </div>
      </div>
    </footer>
  );
};
