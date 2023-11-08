import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import { Link } from "react-router-dom";

const MovieCard = ({ movie, user, token }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Use useEffect to determine if the movie is in the user's favorite list
  useEffect(() => {
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, movie]);

  const addFavoriteMovie = () => {
    if (user) {
      fetch(
        `https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}/movies/${movie._id}`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
          throw Error("Failed to add favorite movie");
        }
      })
      .then((updateduser) => {
        if (updateduser) {
          alert("Successfully added to favorites");
          // Update user data and isFavorite state
          localStorage.setItem("user", JSON.stringify(updateduser));
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
        `https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}/movies/${movie._id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to remove fav movie");
          throw Error("Failed to remove favorite movie");
        }
      })
      .then((updateduser) => {
        if (updateduser) {
          alert("Successfully removed from favorites");
          // Update user data and isFavorite state
          localStorage.setItem("user", JSON.stringify(updateduser));
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
    <Card className="movie-card h-100">
      <Card.Img variant="top" src={movie.imageUrl} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>

        <br />
        <Link to={`/movies/${movie.id}`}>Click for more Info</Link>
        {isFavorite ? (
          <>
            <Button className="update" onClick={removeFavoriteMovie} style={{ backgroundColor: 'green', color: 'white' }}>
              Deselect Favorite
            </Button>
          </>
        ) : (
          <>
            <Button className="delete" onClick={addFavoriteMovie} style={{ backgroundColor: 'green', color: 'white' }}>
              Select as Favorite
            </Button>
          </>
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
  user: PropTypes.object,
  token: PropTypes.string,
};

export default MovieCard;
