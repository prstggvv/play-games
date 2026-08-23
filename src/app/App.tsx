import { useEffect, useRef, useState } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import AppRouter from '../components/AppRouter/AppRouter';
import { classNames } from '../shared/lib/classNames/classNames';
import { ScrollTrigger } from '../shared/lib/gsap';
import { setLenis } from '../shared/lib/scrollToSection/scrollToSection';
import { useIsMobile } from '../shared/lib/hooks/useIsMobile';
import { PageLoader } from '../shared/ui/PageLoader';
import './styles/index.css';

function App() {
  const lenisRef = useRef<LenisRef>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setLenis(null);
      return;
    }

    const lenis = lenisRef.current?.lenis ?? null;
    setLenis(lenis);

    if (!lenis) {
      return () => setLenis(null);
    }

    const handleLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', handleLenisScroll);
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', handleLenisScroll);
      setLenis(null);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isLoading) return;
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => cancelAnimationFrame(raf);
  }, [isLoading]);

  const content = (
    <>
      {isLoading && <PageLoader onFinish={() => setIsLoading(false)} />}
      <div className={classNames('app', {}, [])}>
        <div className={classNames('wrapper', {}, [])}>
          <AppRouter />
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return content;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {content}
    </ReactLenis>
  );
}

export default App;
