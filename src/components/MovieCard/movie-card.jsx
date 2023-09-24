// Here you import the PropTypes 
import PropTypes from "prop-types";

// The MovieCard function component 
export const MovieCard = ({ movie, onMovieClick }) => {
  const { title, imageUrl, director, genre } = movie;

  return (
    <div onClick={() => onMovieClick(movie)}>
      {title && <h3>{title}</h3>}
      {director && <p>Director: {director}</p>}
      {imageUrl && <img src={imageUrl} alt={title} />}
      {genre && genre.name && <p>Genre: {genre.name}</p>}
    </div>
  );
};









// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};