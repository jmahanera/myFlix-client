export const MovieView = ({ movies, onBackClick }) => {
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <div>
            <img src={movie.imageUrl} alt={movie.title} />
          </div>
          <div>
            <span>Title: </span>
            <span>{movie.title}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{movie.description}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.genre}</span>
          </div>
          {/* Add other movie details you want to display */}
        </div>
      ))}
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
