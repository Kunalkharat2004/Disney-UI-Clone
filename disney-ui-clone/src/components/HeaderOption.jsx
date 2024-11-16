import React from 'react'

const HeaderOption = ({Icon,title}) => {
  return (
    <div className='text-white flex items-center gap-3 lg:text-lg cursor-pointer hover:underline underline-offset-8 mb-3'>
        {Icon}
        <p className='text-[10px] custom-sm:text-[1rem] md:text-[11px] lg:text-[20px] font-semibold'>{title}</p>
    </div>
  )
}

export default HeaderOption