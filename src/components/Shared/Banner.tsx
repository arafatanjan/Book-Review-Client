import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner_container}>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-auto rounded-xl text-center bg-white px-6 py-10 sm:px-8 sm:py-12 md:px-16 md:py-20">
          <p className="w-40 mx-auto rounded-full p-2 my-5 bg-cyan-100 text-accent text-sm md:text-base">
            21 October 2024
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Book Review
          </h1>
          <p className="text-gray-400 mt-3 w-[90%] sm:w-[80%] md:w-[75%] mx-auto text-sm sm:text-base">
            <i>
              Dive into the fascinating world of book review.
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;