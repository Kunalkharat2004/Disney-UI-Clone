import disney from '../assets/Images/disney.png'
import marvel from '../assets/Images/marvel.png'
import pixar from '../assets/Images/pixar.png'
import starwars from '../assets/Images/starwar.png'
import nationalgeographic from '../assets/Images/nationalG.png'

import disneyVideo from '../assets/Videos/disney.mp4'
import marvelVideo from '../assets/Videos/marvel.mp4'
import pixarVideo from '../assets/Videos/pixar.mp4'
import starwarsVideo from '../assets/Videos/star-wars.mp4'
import nationalgeographicVideo from '../assets/Videos/national-geographic.mp4'

const productionListOptions = [
    {
        id:1,
        image: disney,
        video: disneyVideo
    },
    {
         id:2, 
         image: marvel,
          video: marvelVideo
    },
    {
         id:3,
         image: pixar,
         video: pixarVideo
    },
    {
         id:4,
         image: starwars,
         video: starwarsVideo
    },{
        id: 5,
        image:nationalgeographic,
        video: nationalgeographicVideo
    }
]
export default productionListOptions;

