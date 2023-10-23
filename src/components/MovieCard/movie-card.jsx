
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, cardClassName, toggleFavorite, user, token }) => {
  const [isFavorite, setIsFavorite] = useState(false);

const [showDetails, setShowDetails] = useState(false);
const toggleDetails = () => {
  setShowDetails(!showDetails);
};

  // Use useEffect to determine if the movie is in the user's favorite list
  useEffect(() => {
    console.log("user object in parent component:", user); 
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, movie]);

 const addFavoriteMovie = () => {
  if (user) {
    fetch(
      `https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}/movies/${movie.id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Failed to add fav movie");
        throw new Error("Failed to add favorite movie");
      }
    })
    .then((updateduser) => {
      if (updateduser) {
        alert("Successfully added to favorites");
        // Update user data and isFavorite state
        localStorage.setItem("user", JSON.stringify(updateduser));
        if (toggleFavorite) {
          toggleFavorite(movie.id);
        }
        setIsFavorite(true);
      }
    })
    .catch((error) => {
      alert(error);
    });
  } else {
    console.error("user object is undefined.");
  }
};



const removeFavoriteMovie = () => {
  if (user) {
    fetch(
      `https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}/movies/${movie.id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Failed to remove fav movie");
        throw new Error("Failed to remove favorite movie");
      }
    })
    .then((updateduser) => {
      if (updateduser) {
        alert("Successfully removed from favorites");
        // Update user data and isFavorite state
        localStorage.setItem("user", JSON.stringify(updateduser));
        if (toggleFavorite) {
          toggleFavorite(movie.id);
        }
        setIsFavorite(false);
      }
    })
    .catch((error) => {
      alert(error);
    });
  } else {
    console.error("user object is undefined.");
  }
};



  return (
    <Card className={`movie-card ${cardClassName} h-100`}>
      <Card.Img variant="top" src={movie.imageUrl} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        {showDetails && (
          <div>
            <p>Director: {movie.director.name}</p>
            <p>Actors: {movie.actors.join(", ")}</p>
            {/* Add other movie details here */}
          </div>
        )}
        <Link to="#" onClick={toggleDetails}>
          {showDetails ? "Hide Details" : "Show Details"}
        </Link>
        <Link to={`/movies/${movie.id}`}>Click for more Info</Link>
        {isFavorite ? (
          <button onClick={removeFavoriteMovie}>Remove from Favorites</button>
        ) : (
          <button onClick={addFavoriteMovie}>Add to Favorites</button>
        )}
      </Card.Body>
    </Card>
  );
};


MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    genre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ]),
    description: PropTypes.string.isRequired,
    director: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ]),
    actors: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  cardClassName: PropTypes.string,
  toggleFavorite: PropTypes.func, // Include the toggleFavorite prop
  user: PropTypes.object, // Update user prop to match the actual data type
  token: PropTypes.string, // Update token prop to match the actual data type
  username: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Correct the username prop type
};


export default MovieCard;