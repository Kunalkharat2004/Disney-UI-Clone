import axios from 'axios';

const baseUrl = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_TMDB_API_KEY

const fetchData = async() =>{
    console.log("Token",token);
    
   try{
   

    const response = await axios.get(`${baseUrl}/trending/movie/day?language=en-US&api_key=${token}`,
        {
            headers:{
                "Content-Type":"application/json"
            }
        }
    )
    // console.log(response);
    return response.data;

   }catch(err){
    console.error(err);
    
   }
}

export default fetchData;