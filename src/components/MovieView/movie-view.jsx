// MovieView Component
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
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
          <span>{movie.genre.name}</span> {/* Extract genre name */}
        </div>
         <div>
          <span>Actors: </span>
          <span>{movie.actors}</span> {/* Extract genre name */}
        </div>
        {/* Add other movie details you want to display */}
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
