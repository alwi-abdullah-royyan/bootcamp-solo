import Icons from "@/components/atoms/Icons";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      {/* Inline Style for Animation */}
      <style>
        {`
          .emoji-404 {
            position: relative;
            animation: mymove 2.5s infinite;
          }
          @keyframes mymove {
            33% { top: 0px; }
            66% { top: 20px; }
            100% { top: 0px; }
          }
        `}
      </style>

      {/* 404 Page */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* SVG Emoji */}
        <Icons.Emoji404 />

        {/* Error Message */}
        <div className="text-center mt-6">
          <h1 className="text-gray-500 text-6xl font-bold tracking-widest">4 0 4</h1>
          <p className="text-gray-500 text-xl mt-2">Sorry, we couldn&apos;t find what you are looking for!</p>
        </div>

        {/* Go Back Button */}
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-3 text-lg font-mono text-gray-500 bg-gray-200 rounded-md hover:shadow-md transition-all"
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default NotFound;
