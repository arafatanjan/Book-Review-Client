import Banner from "@/components/Shared/Banner";
import dynamic from "next/dynamic";

const Reviews = async () => {
  const BookReview = dynamic(() => import("@/components/ui/BookReview"), {
    ssr: false,
  });
  const res= await fetch("http://localhost:5000/reviews",{
    cache:"no-store"
  });
  const blogs= await res.json();
  //console.log(blogs)

  return (
    <div>
      <Banner />
      <BookReview blogs={blogs}/>
    </div>
  );
}

export default Reviews