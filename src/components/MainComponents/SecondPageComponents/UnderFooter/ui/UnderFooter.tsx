import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import cls from './UnderFooter.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import revealPhoto from '../../../../../shared/assets/images/contact.jpg';

interface IUnderFooter {
  className?: string;
}

const TITLE = 'Пироговский';
const PHOTO_ALT = 'Теннисный клуб «Пироговский»';

export const UnderFooter = ({ className }: IUnderFooter) => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ['start end', 'end end'],
  });

  const photoScale = useTransform(scrollYProgress, [0, 1], [1.28, 1.06]);
  const photoY = useTransform(scrollYProgress, [0, 1], ['7%', '-7%']);

  return (
    <>
      <div ref={spacerRef} className={classNames(cls.spacer, {}, [])} aria-hidden="true" />

      <section className={classNames(cls.section, {}, [className ?? ''])}>
        <motion.div
          className={classNames(cls.photo, {}, [])}
          style={isReduced ? { scale: 1.06 } : { scale: photoScale, y: photoY }}
        >
          <img className={classNames(cls.img, {}, [])} src={revealPhoto} alt={PHOTO_ALT} />
        </motion.div>

        <div className={classNames(cls.scrim, {}, [])} aria-hidden="true" />

        <div className={classNames(cls.inner, {}, [])}>
          <h2 className={classNames(cls.title, {}, [])}>{TITLE}</h2>
        </div>
      </section>
    </>
  );
};
