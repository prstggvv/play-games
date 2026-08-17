import { useRef } from 'react';
import cls from './UnderFooter.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { gsap, useGSAP, isMotionDisabled } from '../../../../../shared/lib/gsap';
import revealPhoto from '../../../../../shared/assets/images/contact.jpg';

interface IUnderFooter {
  className?: string;
}

const TITLE = 'Пироговский';
const PHOTO_ALT = 'Теннисный клуб «Пироговский»';

export const UnderFooter = ({ className }: IUnderFooter) => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isMotionDisabled()) {
        gsap.set(photoRef.current, { scale: 1.06 });
        return;
      }

      gsap.fromTo(
        photoRef.current,
        { scale: 1.28, yPercent: 7 },
        {
          scale: 1.06,
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: spacerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      );
    },
    { scope: spacerRef },
  );

  return (
    <>
      <div ref={spacerRef} className={classNames(cls.spacer, {}, [])} aria-hidden="true" />

      <section className={classNames(cls.section, {}, [className ?? ''])}>
        <div ref={photoRef} className={classNames(cls.photo, {}, [])}>
          <img className={classNames(cls.img, {}, [])} src={revealPhoto} alt={PHOTO_ALT} />
        </div>

        <div className={classNames(cls.scrim, {}, [])} aria-hidden="true" />

        <div className={classNames(cls.inner, {}, [])}>
          <h2 className={classNames(cls.title, {}, [])}>{TITLE}</h2>
        </div>
      </section>
    </>
  );
};
