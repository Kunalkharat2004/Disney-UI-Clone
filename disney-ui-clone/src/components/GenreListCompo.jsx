import { useEffect, useRef, useState } from "react";
import GenreList from "../data/GenreList";
import { fetchMovieByGenre } from "../services/movieServices";
import MovieCard from "./MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const GenreListCompo = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const genreRefs = useRef([]); // Create an array of refs
  const [arrowVisibility, setArrowVisibility] = useState({}); // State to handle visibility of arrows

  useEffect(() => {
    const getMoviesByGenre = async () => {
      try {
        const moviesPromise = GenreList.slice(0, 5).map(async (item) => {
          const response = await fetchMovieByGenre(item.id);
          return {
            genreId: item.id,
            movies: response.data.results,
          };
        });

        const genreData = await Promise.all(moviesPromise);

        // Update state with the fetched movie data by genre
        const genreMoviesMap = genreData.reduce((acc, { genreId, movies }) => {
          acc[genreId] = movies;
          return acc;
        }, {});
        setMoviesByGenre(genreMoviesMap);

        // Initialize arrow visibility for each genre
        const initialVisibility = GenreList.slice(0, 5).reduce((acc, item) => {
          acc[item.id] = { showLeft: false, showRight: true };
          return acc;
        }, {});
        setArrowVisibility(initialVisibility);
      } catch (err) {
        console.error(err);
      }
    };
    getMoviesByGenre();
  }, []);

  // Function to scroll right
  const scrollGenreRight = (index, genreId) => {
    const element = genreRefs.current[index];
    if (element) {
      const scrollAmount = 1100;
      element.scrollLeft += scrollAmount;
      updateArrowVisibility(element, genreId);
    }
  };

  // Function to scroll left
  const scrollGenreLeft = (index, genreId) => {
    const element = genreRefs.current[index];
    if (element) {
      const scrollAmount = 1100;
      element.scrollLeft -= scrollAmount;
      updateArrowVisibility(element, genreId);
    }
  };

  // Function to update arrow visibility based on scroll position
  const updateArrowVisibility = (element, genreId) => {
    const isAtStart = element.scrollLeft === 0;
    
    // Use Math.ceil to account for fractional scroll positions
    const isAtEnd =
      Math.ceil(element.scrollLeft + element.clientWidth) >= element.scrollWidth;

    setArrowVisibility((prevState) => ({
      ...prevState,
      [genreId]: {
        showLeft: !isAtStart,
        showRight: !isAtEnd,
      },
    }));
  };

  return (
    <div className="relative">
      <div className="py-4 custom-sm:py-6 md:py-12">
        {GenreList.slice(0, 5).map((item, index) => (
          <div key={index} className="relative md:px-16">
            <h1 className="text-lg custom-sm:text-xl md:text-2xl font-bold text-white">
              {item.name}
            </h1>

            {/* Left Scroll Button */}
            {arrowVisibility[item.id]?.showLeft && (
              <FaChevronLeft
                className="hidden md:block text-white text-4xl cursor-pointer absolute z-[999] transform top-1/2 mx-8 hover:scale-125 transition-all duration-200 ease-in-out"
                onClick={() => scrollGenreLeft(index, item.id)}
              />
            )}

            {/* Right Scroll Button */}
            {arrowVisibility[item.id]?.showRight && (
              <FaChevronRight
                className="hidden md:block text-white text-4xl cursor-pointer absolute z-[999] transform top-1/2 right-[45px] mx-8 hover:scale-125 transition-all duration-200 ease-in-out"
                onClick={() => scrollGenreRight(index, item.id)}
              />
            )}

            <div
              className="flex overflow-x-scroll space-x-4 py-6 scrollbar-hide scroll-smooth"
              ref={(el) => {
                genreRefs.current[index] = el;
                // Attach scroll event listener to update visibility
                if (el) {
                  el.addEventListener("scroll", () =>
                    updateArrowVisibility(el, item.id)
                  );
                }
              }}
            >
              {moviesByGenre[item.id] &&
                moviesByGenre[item.id].map((movie, movieIndex) => (
                  <MovieCard key={movieIndex} movie={movie} cardMinWidth="min-w-52" cardWithVideo={false}/>
                ))}
            </div>
          </div>          
        ))}
      </div>
    </div>
  );
};

export default GenreListCompo;