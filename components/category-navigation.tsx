"use client"

interface CategoryNavigationProps {
  categories?: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoryNavigation({
  categories = [], // Provide a default empty array
  selectedCategory,
  onSelectCategory,
}: CategoryNavigationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="py-2">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category}
              className={`flex items-center w-full text-left px-4 py-3 transition-colors ${
                selectedCategory === category
                  ? "bg-gray-100 dark:bg-gray-700 border-l-4 border-[#DEA818]"
                  : "border-l-4 border-transparent"
              }`}
              onClick={() => onSelectCategory(category)}
            >
              <span className="ml-2 text-sm font-medium dark:text-white">{category}</span>
            </button>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
