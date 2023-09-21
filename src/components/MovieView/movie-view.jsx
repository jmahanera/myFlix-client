export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
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
      <div>
        <span>Actors: </span>
        <span>{movie.actors}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>DirectorBio: </span>
        <span>{movie.director_bio}</span>
      </div>
      <div>
        <span>BirthYear: </span>
        <span>{movie.birthyear}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};