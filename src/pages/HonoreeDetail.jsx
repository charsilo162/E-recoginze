import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BackgroundMesh } from '../components/ui/BackgroundMesh';
import { MediaHub } from '../components/sections/MediaHub';
import { Card } from '../components/ui/Card';

export default function HonoreeDetail() {
  const { id } = useParams();

  // Mock profile data dictionary - realistically this will fetch from your backend via the ID parameter
  const profile = {
    name: "Aliko Dangote",
    title: "President & Chief Executive, Dangote Group",
    bio: "Recognized globally for unprecedented industrial scale outputs across architectural sectors, enterprise logistics management, and historic community empowerment. His work anchors sub-continental infrastructure development initiatives.",
    image: "/images/dangote-large.jpg",
    views: "5,345"
  };

  const galleryImages = ["/images/g1.jpg", "/images/g2.jpg", "/images/g3.jpg"];
  const customTrendingVideos = [{ thumbnail: "/images/v1.jpg", views: profile.views }];

  return (
    <div className="relative min-h-screen bg-slate-50 text-zinc-800 py-12">
      <BackgroundMesh />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Layout Split Hero Profile Module */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center pt-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-1 aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-white/80"
          >
            <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
          </motion.div>

          <div className="md:col-span-2 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              Verified Dossier Profile
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">{profile.name}</h1>
            <p className="text-md font-bold text-zinc-500">{profile.title}</p>
            <hr className="border-zinc-200" />
            <p className="text-zinc-600 leading-relaxed text-sm md:text-base pt-2">{profile.bio}</p>
          </div>
        </section>

        {/* Dynamic Image Carousel Row Wrapper */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Media & Press Gallery</h3>
          <div className="grid grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <Card key={i} className="aspect-[16/10] border-zinc-200">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </Card>
            ))}
          </div>
        </section>

        {/* Media Hub Section Reused completely without duplicating list parameters */}
        <MediaHub 
          videos={customTrendingVideos}
          blogs={[]} // Keeping it completely modular and dry
        />

        {/* Client Reviews Section Module */}
        <section className="py-12 border-t border-zinc-200 text-center space-y-8">
          <h3 className="text-xl font-black tracking-wider uppercase text-zinc-400">Clients Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-3 p-4">
                <div className="w-12 h-12 bg-zinc-300 rounded-full mx-auto" />
                <p className="text-xs text-zinc-500 italic">"An absolute paragon of industrial execution. A thoroughly well-deserved recognition placement."</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}