import { BackgroundMesh } from '../components/ui/BackgroundMesh';
import { HomeHero } from '../components/sections/HomeHero';
import { AboutSection } from '../components/sections/AboutSection';
import { ActionBanner } from '../components/sections/ActionBanner';
// import { SpotlightGrid } from '../components/sections/SpotlightGrid';
import { NominationModal } from '../components/modals/NominationModal';
import heroBg from '../assets/image/img2.jpg';
import heroBg1 from '../assets/image/img1.jpg';
import heroBg2 from '../assets/image/img3.jpg';
import { useWinnerStore } from '../store/useWinnerStore';
import { SpotlightGrid } from '../components/ui/SpotlightGrid';
import { useEffect } from 'react';


export default function Home() {

    const { featuredWinners, fetchFeaturedWinners } = useWinnerStore();

  useEffect(() => {
    fetchFeaturedWinners();
  }, [fetchFeaturedWinners]);


  const homeStats = [
    { value: "1M+", label: "Gen-Z Assets Recognized" },
    { value: "1000+", label: "Inductees Certified" }
  ];

  // const featuredWinners = [
  //   { id: "1", title: "Alex Cover Olamide", subtitle: "Tech Innovator Elite", description: "Recognized for driving massive transformation across distributed systems architectures.", badge: "Gold Class", image: heroBg },
  //   { id: "2", title: "Sanni Temilola", subtitle: "Creative Arts Pioneer", description: "Broke boundaries in visual storytelling and modern performance production workflows.", badge: "Elite Class", image: heroBg1 },
  //   { id: "3", title: "Sylvia Chiamaka", subtitle: "Community Impact Catalyst", description: "Spearheading grassroot civic technology educational frameworks within the sub-continent.", badge: "Diamond Class", image: heroBg2 }
  // ];

  return (
    <div className="relative min-h-screen text-zinc-800 selection:bg-amber-200">
      {/* Decorative Canvas Background Base Layer */}
      <BackgroundMesh />
      
      {/* 1. Updated Aligned Centered Layout Home Hero */}
      <HomeHero 
        title="RECOGNIZING THE EXCEPTIONAL"
        subtitle="Be the first to be recognized in any field. Recognition is what brings validation."
        stats={homeStats}
      />

      {/* [Note: You can insert your horizontal 'our Partners' image bar here code-wise] */}

      {/* 2. Brand New Dark Contrast About Layout Block */}
      <AboutSection />

      {/* 3. Action Block: Verification Search Banner */}
      <ActionBanner 
        title="The Gen-Z Recognition Standard"
        description=""
       
        imageSrc={heroBg}
      />
      {/* <ActionBanner title="The Gen-Z Recognition Standard" /> */}

      {/* 4. Directory Highlight Grid Container */}
      <SpotlightGrid 
              title="2026 Recognized Honorees"
              tag="Hall of Fame Spotlight"
              items={featuredWinners}
              columns={3}
            />
      {/* <NominationModal /> */}
    </div>
  );
}