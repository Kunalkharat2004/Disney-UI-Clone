import Header from './components/Header'
import Slider from './components/Slider'
import ProductionList from './components/ProductionList'
import GenreListCompo from './components/GenreListCompo'
import VerticalListCompo from './components/VerticalListCompo'
import { fetchTopRatedMovies, fetchTopRatedVideo } from './services/movieServices'

const App = () => {
  return (
    <div className='h-full bg-gray-900'>
      <Header/>
      <Slider/>
      <ProductionList/>
      <GenreListCompo/>
      <VerticalListCompo fetchData={fetchTopRatedMovies} title='Top rated movies' hoverVideoEndPoint={fetchTopRatedVideo}/>
    </div>
  )
}

export default App