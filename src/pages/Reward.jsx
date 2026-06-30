import React from 'react';
import { BackgroundMesh } from '../components/ui/BackgroundMesh';
import { RewardHero } from '../components/sections/RewardHero';
// import { SpotlightGrid } from '../components/sections/SpotlightGrid';
import { RegistrySpotlightSection } from '../components/sections/RegistrySpotlightSection';
export default function Reward() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background Mesh Layer */}
      <BackgroundMesh />

      {/* Hero Section */}
      <RewardHero 
        title="Search for Recognized People & Exploits"
        subtitle="Explore the global verified decentralized ledger of outstanding performance metrics across all domains."
      />

      {/* 
        Independent Self-Contained Spotlight Grid.
        It handles its own loading skeletons, data fetching, 
        and pagination controls automatically.
      */}
      <RegistrySpotlightSection 
        title="Impact Endorsements & Allocations"
        tag="Global Nomination Registry"
        columns={4}
      />
    </div>
  );
}