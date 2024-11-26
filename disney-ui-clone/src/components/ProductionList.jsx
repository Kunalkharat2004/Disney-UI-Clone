import productionListOptions from '../data/ProductionListOptions'
const ProductionList = () => {
  return (
    <div className='flex items-center gap-2 md:gap-6 p-2 px-5 md:px-16'>
        {
            productionListOptions.map((item,index)=>(
                <div  key={index} className='relative border-[2px] border-gray-600  rounded-lg
                hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out
                shadow-xl shadow-gray-800 hover:shadow-2xl
                '>
                  <video src={item.video} autoPlay playsInline loop muted className='absolute object-cover opacity-0 hover:opacity-50 transition-all duration-300 ease-in-out w-full h-auto rounded-md'/>
                    <img src={item.image} alt={index} className='object-cover z-[1] w-full h-auto'/>
                </div>
            ))
        }
    </div>
  )
}

export default ProductionList