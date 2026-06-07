import { BackgroundMesh } from '../components/ui/BackgroundMesh';
import { RewardHero } from '../components/sections/RewardHero';
import { SpotlightGrid } from '../components/sections/SpotlightGrid';
import heroBg from '../assets/image/img1.jpg';
import heroBg1 from '../assets/image/img2.jpg';
import heroBg2 from '../assets/image/img3.jpg';

export default function Reward() {
  const rewardItems = [
    { id: "1", title: "National Impact Registry", subtitle: "Category: Leadership", description: "Verified system contributors with verified highest social equity index scores.", image: heroBg },
    { id: "2", title: "Innovation Grant Cohort", subtitle: "Category: Venture Capital", description: "Recipients of the quarterly ecosystem scaling equity distribution funds.", image: heroBg1 },
    { id: "3", title: "E-Reward Vanguard", subtitle: "Category: Creators", description: "Exceptional creatives recognized for amplifying cultural heritages globally.", image: heroBg2 },
    { id: "4", title: "Academic Laureates", subtitle: "Category: Research", description: "Scientific breakthroughs and computational systems optimization authors.", image: heroBg }
  ];

  return (
    <div className="relative min-h-screen text-white">
      <BackgroundMesh />

      <RewardHero 
        title="Search for Recognized People & Exploits"
        subtitle="Explore the global verified decentralized ledger of outstanding performance metrics across all domains."
      />

      <SpotlightGrid 
        title="Impact Endorsements & Allocations"
        tag="Active Rewards"
        items={rewardItems}
        columns={4}
      />
    </div>
  );
}