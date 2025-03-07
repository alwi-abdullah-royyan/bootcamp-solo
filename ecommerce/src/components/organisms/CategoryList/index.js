import CategoryItem from "@/components/molecules/CategoryItem";
import LoadingMessage from "@/components/atoms/LoadingMessage";
import ErrorMessage from "@/components/atoms/ErrorMessage";

const CategoryList = ({ categories, onDelete, deleting, loading, error }) => {
  if (loading) return <LoadingMessage message="Loading categories..." />;
  if (error) return <ErrorMessage message="Failed to load categories." />;
  if (!categories || categories.length === 0) return <LoadingMessage message="No categories found." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {categories?.data?.map((category) => (
        <CategoryItem key={category.id} category={category} onDelete={onDelete} deleting={deleting === category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
