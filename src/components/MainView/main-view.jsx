import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };
  const [selectedMovie, setSelectedMovie] = useState(null);

 
  useEffect(() => {
    fetch("https://primemovies-39075872fbeb.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);  // Assuming the response is an array of movie objects
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);
  



  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The Movie list is empty!</div>;
  }

   return (
    <div>
      {movies.map((movie) => (
       <MovieCard key={movie.title} movie={movie} onMovieClick={() => onMovieClick(movie)} />
      ))}
    </div>
  );
};








