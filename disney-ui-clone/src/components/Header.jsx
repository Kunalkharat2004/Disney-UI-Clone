import DisneyLogo from "../assets/Images/logo.png"
import { navOptions } from "../data/NavBarOptions"
import HeaderOption from "./HeaderOption"
import UserImage from "../assets/Images/userimage.png"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaUser } from "react-icons/fa";
import { useState } from "react"

const Header = () => {

    const [toggle,setToggle] = useState(false)
  return (
    <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2 md:gap-4">
            <img src={DisneyLogo} alt="logo" className="w-32 md:w-[10rem] object-cover"/>
            <div className="flex items-center gap-4 md:gap-10
            ">
                {/* Show The navoption on larger screen size */}
                <div className="hidden md:flex items-center gap-4 md:gap-10">
                {
                    navOptions.map((option,index)=>
                    <HeaderOption key={index} Icon={option.icon} title={option.text}/>
                    )
                }
                </div>

                {/* Show this div on smaller screen size */}
                <div className="md:hidden z-[999] flex items-center gap-4 md:gap-10">
                {
                    navOptions.map((option,index)=>
                        index<3 &&
                    <HeaderOption key={index} Icon={option.icon} title={""}/>
                    )
                }
                <div className="relative" onClick={()=>setToggle(!toggle)}>
                    <HeaderOption title={""} Icon={<BsThreeDotsVertical />}/>
                    {
                        toggle &&
                        <div className="absolute top-[20px] border-[1px] px-2 py-4 mt-2 custom-sm:px-5 bg-[#121212] border-gray-700">
                    {
                    navOptions.map((option,index)=>
                        index>= 3 &&
                    <HeaderOption key={index} Icon={option.icon} title={option.text}/>
                    )
                }
                <HeaderOption title={"Profile"} Icon={<FaUser />}/>
                    </div>
                    }
                </div>
                </div>
            </div>
        </div>

        <div className="pr-4 invisible md:visible">
            <img src={UserImage} className="w-[35px] lg:w-[54px] object-cover rounded-full" alt="User Profile" />
        </div>
    </div>
  )
}

export default Header