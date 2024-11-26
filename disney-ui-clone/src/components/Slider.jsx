import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { fetchTrendingMovies } from '../services/movieServices';

const Slider = () => {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const [movieList, setMovieList] = useState([]);
    const [error, setErrorMessage] = useState(null);

    const elementRef = useRef(null);
    const currentIndexRef = useRef(0); // Use useRef to keep track of the current index in the interval
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await fetchTrendingMovies();
                setMovieList(data.results);
            } catch (err) {
                console.error(err);
                setErrorMessage(err.message);
            }
        };
        getMovies();
    }, []);

    // Setup the automatic slider interval
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndexRef.current + 1) % movieList.length;
            scrollToImage(nextIndex);
            setCurrentIndex(nextIndex);
            currentIndexRef.current = nextIndex; // Update the ref to the new index
        }, 4000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(interval);
    }, [movieList.length]); // Only set the interval when the movie list is fetched

    const scrollToImage = (index) => {
        if (elementRef.current && movieList.length > 0) {
            const imageWidth = elementRef.current.firstChild.clientWidth + 20;
            const scrollPosition = index * imageWidth;

            elementRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        const nextIndex = (currentIndex + 1) % movieList.length;
        setCurrentIndex(nextIndex);
        currentIndexRef.current = nextIndex;
        scrollToImage(nextIndex);
    };

    const scrollLeft = () => {
        const prevIndex = (currentIndex - 1 + movieList.length) % movieList.length;
        setCurrentIndex(prevIndex);
        currentIndexRef.current = prevIndex;
        scrollToImage(prevIndex);
    };

    return (
        <div className="relative">
            <FaChevronLeft
                className="hidden md:block text-white text-4xl cursor-pointer absolute transform -translate-y-1/2 top-1/2 left-[45px] mx-12"
                onClick={scrollLeft}
            />
            <FaChevronRight
                className="hidden md:block text-white text-4xl cursor-pointer absolute transform -translate-y-1/2 top-1/2 mx-12 right-[45px]"
                onClick={scrollRight}
            />
            <div className="flex overflow-x-scroll scrollbar-hide w-full px-16 py-6 scroll-smooth" ref={elementRef}>
                {movieList.map((movie, index) => (
                    <img
                        key={index}
                        src={IMAGE_BASE_URL + movie.backdrop_path}
                        className="min-w-full md:h-[30rem] object-cover object-top mr-5 rounded-md focus:outline-none hover:outline hover:outline-4 hover:outline-white cursor-pointer"
                    />
                ))}
            </div>

            {/* Dot navigation */}
            <div className='hidden md:absolute z-30 left-1/2 bottom-7 space-x-3 -translate-x-1/2'>
                {
                    movieList.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full 
                        ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-500'}
                        `}
                        ></button>
                    ))
                }
            </div>
        </div>
    );
};

export default Slider;
