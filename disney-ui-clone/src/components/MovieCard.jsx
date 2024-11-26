import PropTypes from 'prop-types';

const MovieCard = ({movie,cardMinWidth,cardWithVideo}) => {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  return (
    <div
      className={`min-w-32 md:${cardMinWidth} relative overflow-hidden rounded-lg transition-transform transform hover:scale-105 cursor-pointer`}
      style={{ height: cardWithVideo ? "400px" : "auto" }}
    >
      <img
        src={IMAGE_BASE_URL + movie.poster_path}
        alt={movie.title}
        className={`object-cover object-center w-full h-full rounded-lg focus:outline-none`}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 rounded-lg"></div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  cardMinWidth: PropTypes.string.isRequired,
  cardWithVideo: PropTypes.string.isRequired,
};

export default MovieCard