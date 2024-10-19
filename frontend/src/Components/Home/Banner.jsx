import React from "react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FlexMovieItems from "../FlexMovieItems";
import { Link } from "react-router-dom";
import SGFaHeart from "../SGFaHeart";
import { useMovies } from "../../utils/SWR";




const Banner = () => {

  const movies = useMovies().movies

  return (
    <div className="relative w-full">
      <Swiper
        className="w-full h-96 bg-dry"
        slidesPerView={1}
        loop={true}
        direction="horizontal"
        speed={1000}
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}

      >
        {movies?.slice(0, 6).map((movie, idx) => (
          <SwiperSlide key={idx} className="relative rounded overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full md:hidden h-100 object-cover"
            />
             <img
              src={movie.images[0]}
              alt={movie.title}
              className="w-full md:inline-block hidden h-full object-cover"
            />
            <div className="absolute linear-bg xl:pl-32 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
              <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">{movie.title}</h1>
              <div className="flex gap-5 items-center text-dryGray">
                <FlexMovieItems movie={movie}></FlexMovieItems>
              </div>
              <p className='text-text text-sm'>{movie.plot}</p>
              <div className="flex gap-5 items-center">
                <Link
                  to={`/watch/${movie.title}`}
                  className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
                >
                  Watch
                </Link>
                <SGFaHeart movie={movie}></SGFaHeart>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
