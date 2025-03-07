import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/product");
  }, [router]); // Run only once when the component mounts

  return <div className="flex h-full justify-center items-center text-black">REDIRECTING...</div>;
};

export default Home;
