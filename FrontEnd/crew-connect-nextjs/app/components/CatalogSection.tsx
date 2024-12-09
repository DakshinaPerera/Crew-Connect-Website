import JobCategoryCard from './JobCategoryCard';

const categories = [
  {
    title: 'Logistics',
    imageUrl: '/images/logistics_card.png',
  },
  {
    title: 'Warehousing',
    imageUrl: '/images/warehousing_card.png',
  },
  {
    title: 'Manufacturing',
    imageUrl: '/images/manufacturing_card.png',
  },
];

const CatalogSection = () => {
  return (
    <section className="relative w-full px-4 py-16">
      {/* Background image with reduced opacity */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url('/images/white_bg.png')",
        }}
      ></div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="mb-4 text-4xl font-bold text-primary">
          Search Our Catalog
        </h2>
        <p className="mb-12 text-xl text-gray-600">
          Find the latest job openings across various trades and industries. Apply
          <br />
          today and take the next step in your career!
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <JobCategoryCard
              key={category.title}
              title={category.title}
              imageUrl={category.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
