export function OtherProductsSkeleton() {
  return (
    <div className="pt-16 border-t border-white/35 space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 w-32 bg-gray-700 rounded-lg" />
        <div className="h-6 w-24 bg-gray-700 rounded-lg" />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-square w-full bg-gray-700 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-4 w-2/3 bg-gray-700 rounded-lg" />
              <div className="h-4 w-1/3 bg-gray-700 rounded-lg" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
