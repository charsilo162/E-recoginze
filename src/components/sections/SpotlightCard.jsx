import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { ballotService } from '../../services/ballotService';
import heroBg from '../../assets/image/img1.jpg';

export const SpotlightCard = ({ item }) => {
  const [metrics, setMetrics] = useState(item.metrics || { views: 0, shares: 0, likes: 0, has_liked: false });
  const [isLiking, setIsLiking] = useState(false);

  // Triggered when clicking to details or rendering
  const handleView = () => {
    ballotService.trackInteraction(item.id, 'view');
  };

  const handleLike = async (e) => {
    e.preventDefault(); // Prevent navigating to route link if clicked inside card structure
    if (isLiking) return;

    // Optimistic UI updates for high performance 🚀
    setIsLiking(true);
    setMetrics(prev => ({
      ...prev,
      has_liked: !prev.has_liked,
      likes: prev.has_liked ? prev.likes - 1 : prev.likes + 1
    }));

    const res = await ballotService.trackInteraction(item.id, 'toggle-like');
    if (res && res.status === 'success') {
      setMetrics(prev => ({ ...prev, likes: res.likes, has_liked: res.has_liked }));
    }
    setIsLiking(false);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    
    // Copy link clean routine
    const shareUrl = `${window.location.origin}/honoree/${item.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Profile URL link copied safely to dashboard clipboard memory!");
      
      // Update backend counts
      setMetrics(prev => ({ ...prev, shares: prev.shares + 1 }));
      ballotService.trackInteraction(item.id, 'share');
    } catch (err) {
      console.error("Could not copy asset text string parameters: ", err);
    }
  };

  return (
    <div className="relative group block h-full">
      <Link to={`/honoree/${item.id}`} onClick={handleView}>
        <Card className="bg-white border-zinc-200/60 text-zinc-800 flex flex-col h-full cursor-pointer hover:shadow-md transition-all duration-300">
          <div className="aspect-[4/5] w-full relative overflow-hidden bg-zinc-100">
            <img 
              src={item.image || heroBg} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          <div className="p-4 flex-grow flex flex-col justify-between bg-zinc-50/50">
            <div>
              <h4 className="font-bold text-sm text-zinc-900 leading-tight group-hover:text-orange-600 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{item.subtitle}</p>
            </div>

            {/* Reusable Metric Engagement Layout Control Bar Strip */}
            <div className="flex items-center justify-between border-t border-zinc-200/80 pt-3 mt-4 text-[11px] text-zinc-500 font-medium">
              <span className="flex items-center gap-1" title="Views">
                👁️ {metrics.views}
              </span>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-1 hover:text-orange-600 transition"
                title="Share Link"
              >
                🔗 {metrics.shares}
              </button>

              <button 
                onClick={handleLike} 
                disabled={isLiking}
                className={`flex items-center gap-1 transition dynamic-scaling active:scale-90 ${metrics.has_liked ? 'text-red-500 font-bold' : 'hover:text-red-500'}`}
                title="Like Entry"
              >
                {metrics.has_liked ? '❤️' : '🤍'} {metrics.likes}
              </button>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};