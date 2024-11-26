import { FaHome } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import { RiMovie2Fill } from "react-icons/ri";

const navOptions = [
   
       { text: "Home",
        icon: <FaHome />}
    ,
       { text: "Search",
        icon: <HiSearch />}
    ,
    {
        text: "Watch List",
        icon: <IoMdAdd />
    },
    {
        text: "Originals",
        icon: <FaStar />
    },
    {
        text: "Movies",
        icon: <RiMovie2Fill />
    },
    {
        text: "Series",
        icon: <BiSolidMoviePlay/>
    }
]

export default navOptions;