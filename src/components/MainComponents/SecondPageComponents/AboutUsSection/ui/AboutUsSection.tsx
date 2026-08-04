import { motion } from 'framer-motion';
import cls from './AboutUsSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { fadeUp, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';
import { aboutUsItems } from '../model/aboutUsItems';

interface IAboutUsSection {
  className?: string;
}

export const AboutUsSection = ({ className }: IAboutUsSection) => {
  return (
    <section id="about" className={classNames(cls.about, {}, [className ?? ''])}>
      <div className={classNames(cls.aboutFull, {}, [])}>
        <motion.div
          className={classNames(cls.abIntro, {}, [])}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <h2 className={classNames(cls.abIntroTitle, {}, [])}>
            Два тренера —<br />одна команда.
          </h2>
          <p className={classNames(cls.abIntroText, {}, [])}>
            Мы каждый день учим детей любить теннис — от первого касания ракетки
            до уверенной подачи.{' '}
            <span className={classNames(cls.hl, {}, [])}>
              Спокойно, по делу и с вниманием к каждому ребёнку.
            </span>
          </p>
        </motion.div>

        <div className={classNames(cls.coaches, {}, [])}>
          {aboutUsItems.map((coach) => (
            <motion.article
              key={coach.name}
              className={classNames(cls.tcoach, { [cls.reverse]: !!coach.reverse }, [])}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <div className={classNames(cls.tcPanel, {}, [])}>
                <div className={classNames(cls.tcTop, {}, [])}>
                  <h3 className={classNames(cls.tcName, {}, [])}>
                    <span className={classNames(cls.n1, {}, [])}>{coach.surname}</span>
                    <span className={classNames(cls.n2, {}, [])}>{coach.name}</span>
                  </h3>
                </div>
                <p className={classNames(cls.tcDesc, {}, [])}>{coach.desc}</p>
              </div>

              <div className={classNames(cls.tcPhoto, {}, [])}>
                <img src={coach.photo} alt={coach.alt} />
              </div>

              <div
                className={classNames(
                  cls.tcNotch,
                  { [cls.tcNotchBl]: !!coach.reverse, [cls.tcNotchBr]: !coach.reverse },
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
