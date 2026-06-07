export const BackgroundMesh = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-slate-50 via-zinc-100 to-gray-50">
      {/* Soft, warm ambient light anomalies */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[160px] animate-pulse duration-[12000ms]" />
    </div>
  );
};