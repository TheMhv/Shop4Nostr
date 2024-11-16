export function ProductDetailsSkeleton() {
  return (
    <div className="space-y-14 animate-pulse">
      <div className="space-y-6">
        <div className="h-8 w-32 bg-gray-700 rounded-full" />

        <div className="space-y-6">
          <div className="h-10 w-2/3 bg-gray-700 rounded-lg" />
          <div className="h-8 w-1/3 bg-gray-700 rounded-lg" />
        </div>
      </div>

      <div className="space-y-12">
        <div className="flex justify-between items-center">
          <div className="h-6 w-20 bg-gray-700 rounded-lg" />
          <div className="h-10 w-32 bg-gray-700 rounded-lg" />
        </div>

        <div className="space-y-4">
          <div className="h-12 w-full bg-gray-700 rounded-full" />
          <div className="h-12 w-full bg-gray-700 rounded-full" />
        </div>
      </div>

      <div className="pt-6 border-t border-white/35 space-y-4">
        <div className="h-6 w-24 bg-gray-700 rounded-lg" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-700 rounded-lg" />
          <div className="h-4 w-5/6 bg-gray-700 rounded-lg" />
          <div className="h-4 w-4/6 bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
