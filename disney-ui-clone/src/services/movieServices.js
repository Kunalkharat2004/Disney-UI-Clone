import apiClient from "./ApiClient";

// Fetch Trending Movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await apiClient.get("/trending/movie/day", {
      params: { language: "en-US" },
    });
    console.log("From Trending movies");
    
    return response.data;
  } catch (err) {
    console.log("Error in fetching trending movies", err);
  }
};

export const fetchMovieByGenre = async(genreID)=>{
   try{
    const response = await apiClient.get("/discover/movie",
        {
            params:{
                with_genres: genreID,
                sort_by:"popularity.desc"
            }
        }
    )

    return response;
   }catch(err){
     console.log("error in fetching movie by genre",err)
   }
}

// Top Rated Movies
export const fetchTopRatedMovies = async() =>{
  try{
    const response = await apiClient.get("/tv/top_rated",
      {
        params:{
          language: "en-US",
          page: 1,
        }
      }
    )
    return response;
  }catch(err){
    console.error(err);
    
  }
}

// Most Popular Movies
export const fetchPopularMovies = async()=>{
  try{
    const response = await apiClient.get("/trending/movie/day",
      {
        params:{
          language: "en-US"
        }
      }
    )

    return response;
  }catch(err){
    console.error(err);
    
  }
}

// Video Endpoint 
export const fetchTopRatedVideo = async(id)=>{
  try{
    const response = await apiClient.get(`/tv/${id}/videos`)
    return response;
  }catch(err){
    console.error(err);
    
  }
}
export const fetchPopularMovieVideo = async(id)=>{
  try{
    const response = await apiClient.get(`/movie/${id}/videos`)
    return response;
  }catch(err){
    console.error(err);
    
  }
}