import { BackgroundVideo } from './components/BackgroundVideo';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <BackgroundVideo />
      <Navbar />
      <HeroSection />
    </div>
  );
}
