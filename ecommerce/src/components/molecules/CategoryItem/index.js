import Link from "next/link";
import ButtonOnclick from "@/components/atoms/ButtonOnclick";
import Text from "@/components/atoms/Text";

const CategoryItem = ({ category, onDelete, deleting }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-md shadow-md flex items-center justify-between">
      <Text>{category.name}</Text>
      <div className="flex items-center gap-2">
        <Link href={`/admin/category/edit/${category.id}`} className="text-blue-400 hover:underline text-sm">
          Edit
        </Link>
        <ButtonOnclick
          label={deleting ? "Deleting..." : "Delete"}
          onClick={() => onDelete(category.id)}
          disabled={deleting}
          className="text-red-400 hover:text-red-600 transition-colors text-sm"
        />
      </div>
    </div>
  );
};

export default CategoryItem;
