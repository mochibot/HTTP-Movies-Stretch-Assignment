import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieForm from './MovieForm';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/movies')
      .then(response => {
        console.log(response);
        this.setState({ movies: response.data });
      })// fill me in with an HTTP Request to `localhost:5000/api/movies`
      .catch(error => {console.log(error)})
  }

  addMovie = (event, movie) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/movies', movie)
      .then(response => {
        console.log(response);
        this.setState({ movies: response.data });
      })
      .catch(error => {console.log(error)})
  }

  render() {
    return (
      <div className="movie-list">
        <MovieForm addMovie={this.addMovie}/>
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
