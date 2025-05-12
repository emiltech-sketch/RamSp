import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-[#40E0D0] dark:bg-teal-800 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Skeleton className="h-6 w-6 rounded-full mr-2" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="mt-3">
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 p-3 flex justify-between items-center">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="flex-1 p-4 pb-20">
        <div className="grid grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
              <Skeleton className="h-32 w-full" />
              <div className="p-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-10">
        <div className="flex justify-around py-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
