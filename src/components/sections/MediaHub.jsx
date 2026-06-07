import { Card } from '../ui/Card';

export const MediaHub = ({ videos = [], blogs = [] }) => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      {/* Short Videos Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white tracking-tight">Trending Content Reels</h3>
          <span className="text-xs text-amber-500 font-semibold cursor-pointer hover:underline">See All</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videos.map((vid, index) => (
            <Card key={index} className="bg-zinc-900/20 border-zinc-800/60 relative aspect-[9/14] group">
              <img src={vid.thumbnail} alt="" className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-xs font-medium text-zinc-300 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                {vid.views} Views
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Blogs Column */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white tracking-tight">Editorial & Press</h3>
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <Card key={index} className="bg-zinc-900/40 border-zinc-800/60 p-4 flex gap-4 items-center">
              <div className="w-20 h-20 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0">
                <img src={blog.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 line-clamp-2 hover:text-amber-400 cursor-pointer transition-colors">
                  {blog.title}
                </h4>
                <p className="text-xs text-zinc-500 mt-1">{blog.date}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </section>
  );
};