import LandingHero from './LandingHero';
import DestinationCard from './DestinationCard';

const destinations = [
  {
    title: 'Paris',
    description: 'Explore the city of lights with top guides and curated travelogues.'
  },
  {
    title: 'Goa',
    description: 'Relax on the beaches and discover hidden gems with local experts.'
  },
  {
    title: 'New York',
    description: 'Experience the city that never sleeps with unique tours and stories.'
  }
];

export default function LandingPage() {
  return (
    <div>
      <LandingHero />
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-800 tracking-tight">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {destinations.map((d) => (
            <DestinationCard key={d.title} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
}
