import Header from "@/components/shared/Header";
import Review from "@/components/shared/customerreviews";
import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Blox AI | Review Us",
  description: "Read what our customers love about us.",
};

const page = () => {

  return (
    <>
      <div className="relative">
        <Header />
      </div>
      <div className="flex w-full flex-col items-center justify-between">
        <Review />
      </div>
      <Footer />
    </>
  );
};

export default page;