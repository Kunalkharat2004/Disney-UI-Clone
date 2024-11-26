import  { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import MovieCard from './MovieCard';

const VerticalListCompo = ({fetchData,title,hoverVideoEndPoint}) => {
  const [item,setItems] = useState([]);
  const [arrowVisibility, setArrowVisibility] = useState({ showLeft: false, showRight: true });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredVideoURL, setHoveredVideoURL] = useState(null)
  const containerRef = useRef(null);

  useEffect(()=>{
    try{
      const getData = async()=>{
        const response = await fetchData();
        console.log(title,response.data.results);
       
        setItems(response.data.results);
      }
      getData();
    }catch(err){
      console.error(err);
    }
    
  },[fetchData])

  const fetchHoverVideo = async(id)=>{
   try{
    const response = await hoverVideoEndPoint(id);
    // console.log(`${id}:`,response.data.results);
    const videoKey = response.data.results.find((video)=> video.type==="Trailer" && video.site==="YouTube");

    if(videoKey){
      setHoveredVideoURL(`https://www.youtube.com/embed/${videoKey.key}`);
    }
   }catch(err){

    console.error(err);
    
   }
    
  }

  // Scroll right
  const scrollRight = () => {
    if (containerRef.current) {
      const scrollAmount = 1100;
      containerRef.current.scrollLeft += scrollAmount;
      updateArrowVisibility();
    }
  };

  // Scroll left
  const scrollLeft = () => {
    if (containerRef.current) {
      const scrollAmount = 1100;
      containerRef.current.scrollLeft -= scrollAmount;
      updateArrowVisibility();
    }
  };

  // Update arrow visibility based on scroll position
  const updateArrowVisibility = () => {
    const element = containerRef.current;
    if (element) {
      const isAtStart = element.scrollLeft === 0;
      const isAtEnd =
        Math.ceil(element.scrollLeft + element.clientWidth) >= element.scrollWidth;
      
      setArrowVisibility({
        showLeft: !isAtStart,
        showRight: !isAtEnd,
      });
    }
  };
  return (
    <div className='relative'>
      <div className='py-4 custom-sm:py-6 md:py-12'>
      <div className='relative md:px-16'>
      <h1 className="text-lg custom-sm:text-xl md:text-2xl font-bold text-white">
          {title}
        </h1>
         {/* Left Scroll Button */}
         {arrowVisibility.showLeft && (
          <FaChevronLeft
            className="hidden md:block text-white text-4xl cursor-pointer absolute z-[999] transform top-1/2 mx-8 hover:scale-125 transition-all duration-200 ease-in-out"
            onClick={()=>scrollLeft()}
          />
        )}

        {/* Right Scroll Button */}
        {arrowVisibility.showRight && (
          <FaChevronRight
            className="hidden md:block text-white text-4xl cursor-pointer absolute z-[999] transform top-1/2 right-[45px] mx-8 hover:scale-125 transition-all duration-200 ease-in-out"
            onClick={()=>scrollRight()}
          />
        )}

        <div className='flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 py-6' ref={containerRef}>
          {
            item.map((option,index)=>(
              <div key={index}
                className={`min-w-52 md:min-w-[420px] overflow-hidden rounded-lg transition-transform transform ${
                hoveredIndex === index ? "scale-110" : "scale-95"
              } cursor-pointer bg-red-500`}

                onMouseEnter={()=>{
                  setHoveredIndex(index);
                  console.log(`Hovered Index: ${index}`);
                  
                  fetchHoverVideo(option.id);
                }}
                onMouseLeave={()=>{
                  setHoveredIndex(null);
                  setHoveredVideoURL(null)
                }}
              >
                <MovieCard movie={option} cardMinWidth='min-w-[420px]' cardWithVideo={true}/>
                 {/* Show video on hover */}
              {hoveredIndex === index && hoveredVideoURL && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${hoveredVideoURL}?autoplay=1&mute=1&controls=0`}
                    title="Trailer"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              </div>
            ))
          }
        </div>
      </div>
      </div>
    </div>
  )
}

VerticalListCompo.propTypes = {
  fetchData: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  hoverVideoEndPoint: PropTypes.string.isRequired
};

export default VerticalListCompo