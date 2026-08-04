import cls from './MainPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { HeroSecondSection } from '../../../components/MainComponents/SecondPageComponents/HeroSecondSection';
import { AboutUsSection } from '../../../components/MainComponents/SecondPageComponents/AboutUsSection';
import { WaySection } from '../../../components/MainComponents/SecondPageComponents/WaySection';
import { Education } from '../../../components/MainComponents/SecondPageComponents/Education';
import { Footer } from '../../../components/MainComponents/Footer';
import { ContactSection } from '../../../components/MainComponents/SecondPageComponents/ContactSection';

interface ISecondMainPageAsync {
  className?: string;
}

const MainPage = ({ className }: ISecondMainPageAsync) => {
  return (
    <main className={classNames(cls.content, {}, [className ?? ''])}>
      <HeroSecondSection />
      <AboutUsSection />
      <WaySection />
      <Education />
      <ContactSection />
      <Footer />
    </main>
  )
};

export default MainPage;
