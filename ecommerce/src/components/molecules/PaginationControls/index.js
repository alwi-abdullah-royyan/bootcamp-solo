import InputOnchange from "@/components/atoms/InputOnchange";
import ButtonOnclick from "@/components/atoms/ButtonOnclick";

export default function PaginationControls({ page, setPage, totalPages, className = "text-black" }) {
  return (
    <div className={`${className} flex flex-wrap justify-center  items-center gap-4 mt-6 sm:space-x-4 sm:flex-nowrap`}>
      <ButtonOnclick
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        label="Previous"
        disabled={page === 0}
        className="px-4 py-2 bg-blue-700 rounded disabled:opacity-30"
      />

      <span className="px-4 py-2">
        Page {page + 1} of {totalPages}
      </span>

      <ButtonOnclick
        onClick={() => setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))}
        label="Next"
        disabled={page + 1 >= totalPages}
        className="px-4 py-2 bg-blue-700 rounded disabled:opacity-30"
      />

      <InputOnchange
        type="number"
        placeholder="Page"
        value={page + 1}
        onChange={(e) => {
          let newPage = Number(e.target.value) - 1;
          if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
          }
        }}
        className="p-2 w-16 text-center border rounded"
      />
    </div>
  );
}
