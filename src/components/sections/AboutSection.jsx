import { Card } from '../ui/Card';

export const AboutSection = () => {
  const descriptions = [
    {
      title: 'Recognition',
      text: 'E-Recognize celebrates outstanding individuals whose contributions create lasting impact across industries, communities, and society.'
    },
    {
      title: 'Validation',
      text: 'Recognition provides credibility, visibility, and acknowledgment for excellence, leadership, innovation, and service.'
    },
    {
      title: 'Legacy',
      text: 'We help exceptional people build a lasting legacy by documenting achievements and showcasing excellence to the world.'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold uppercase tracking-wider text-sm">
            Our Foundation
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-zinc-900">
            About E-Recognize
          </h2>

          <p className="mt-4 text-lg font-medium text-zinc-600 leading-relaxed">
            Recognizing excellence, celebrating achievement, and creating
            opportunities for outstanding individuals to receive the validation
            they deserve.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {descriptions.map((item, index) => (
            <Card
              key={index}
              className="p-8 rounded-2xl border border-orange-100 bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-xl mb-6">
                {index + 1}
              </div>

              <h3 className="text-2xl font-black text-zinc-900 mb-4">
                {item.title}
              </h3>

              <p className="text-base font-medium text-zinc-700 leading-relaxed">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};