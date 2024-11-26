import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const MovieList = ({ title, fetchMovies, cardMinWidth }) => {
  const [movies, setMovies] = useState([]);
  const movieListRef = useRef(null);
  const [arrowVisibility, setArrowVisibility] = useState({
    showLeft: false,
    showRight: true,
  });

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetchMovies();
        console.log("Top Rated tv shows",response.data.results);
        setMovies(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    getMovies();
  }, [fetchMovies]);

  // Function to scroll right
  const scrollRight = () => {
    const element = movieListRef.current;
    if (element) {
      const scrollAmount = 1100;
      element.scrollLeft += scrollAmount;
      updateArrowVisibility(element);
    }
  };

  // Function to scroll left
  const scrollLeft = () => {
    const element = movieListRef.current;
    if (element) {
      const scrollAmount = 1100;
      element.scrollLeft -= scrollAmount;
      updateArrowVisibility(element);
    }
  };

  // Function to update arrow visibility based on scroll position
  const updateArrowVisibility = (element) => {
    const isAtStart = element.scrollLeft === 0;
    const isAtEnd =
      Math.ceil(element.scrollLeft + element.clientWidth) >= element.scrollWidth;

    setArrowVisibility({
      showLeft: !isAtStart,
      showRight: !isAtEnd,
    });
  };

  return (
    <div className="py-4 custom-sm:py-6 md:py-12">
      <h1 className="text-lg custom-sm:text-xl md:text-2xl font-bold text-white">
        {title}
      </h1>

     {/* Left Scroll Button */}
     {arrowVisibility.showLeft && (
        <FaChevronLeft
          className="hidden md:block text-white text-4xl cursor-pointer absolute z-[999] transform top-1/2 mx-8 hover:scale-125 transition-all duration-200 ease-in-out"
          onClick={scrollLeft}
        />
      )}

      {/* Right Scroll Button */}
      {arrowVisibility.showRight && (
        <FaChevronRight
          className="hidden md:block text-white text-4xl cursor-pointer absolute z-[999] transform top-1/2 right-[45px] mx-8 hover:scale-125 transition-all duration-200 ease-in-out"
          onClick={scrollRight}
        />
      )}
     

      <div
        className={`flex overflow-x-scroll space-x-4 py-6 scrollbar-hide scroll-smooth`}
        ref={movieListRef}
        onScroll={() => updateArrowVisibility(movieListRef.current)}
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            cardMinWidth={cardMinWidth} 
          />
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  cardMinWidth: PropTypes.string.isRequired,
};

export default MovieList;
