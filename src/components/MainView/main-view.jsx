import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Avengers",
      description:  "Earth's mightiest heroes must come together to stop the powerful villain Thanos from destroying the universe.",
      genre: "Science Fiction",
      actors: "Robert Downey, Scarlett Johansson & Chris Evans",
      director: "Christopher Nolan",
      director_bio: "Christopher Nolan is a visionary filmmaker known for his mind-bending movies",
      birthyear: "1970",
      image:
        "https://www.themoviedb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
    },
    {
      id: 2,
      title: "The Godfather",
      description:"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      genre: "Adventure",
      actors: "Marlon Brando & Al Pacino",
      director: "Steven Spielberg",
      director_bio: "Steven Spielberg is a legendary director known for his groundbreaking films.",
      birthyear: "1946",
      image:
         "https://www.themoviedb.org/t/p/original/hMTncCsOwZZCNOo5SBhE1wQKpid.jpg",
    },
    {
      id: 3,
      title: "Inception",
      description:   "A thief who enters people's dreams to steal their secrets embarks on a mission to plant an idea into someone's mind.",
      genre: "Crime",
      director: "Francis Ford Coppola",
      image:
         "https://www.themoviedb.org/t/p/original/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg"
    },
     {
      id: 4,
      title: "Jurassic Park",
      description: "A group of people visit a remote island where cloned dinosaurs have been unleashed, leading to a fight for survival.",
      genre: "Fantasy",
      director: "James Cameron",
      image:
         "https://www.themoviedb.org/t/p/original/b1xCNnyrPebIc7EWNZIa6jhb1Ww.jpg"
    },
    {
      id: 5,
      title: "Avatar",
      description: "A paraplegic marine is dispatched to the moon Pandora on a unique mission, but he becomes torn between following orders and protecting an alien civilization.",
      genre: "Crime",
      director: "Quentin Tarantino",
      image:
         "https://www.themoviedb.org/t/p/original/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
}