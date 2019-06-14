import React from 'react';

class MovieForm extends React.Component {
  constructor() {
    super();
    this.state = {
      inputMovie: {
        title: '',
        director: '',
        metascore: '',
        stars: []
      }
    }
  }

  inputHandler = (event) => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === 'metascore') {
      value = parseInt(value, 10);
    } else if (event.target.name === 'stars') {
      value = value.split(',').map(item => item.trim());
    }
    this.setState(prevState => {
      return {
        inputMovie: {
          ...prevState.inputMovie,
          [event.target.name]: value
        }
      }
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.addMovie(event, this.state.inputMovie)
    this.setState({
      inputMovie: {
        title: '',
        director: '',
        metascore: '',
        stars: []
      }
    })
  }

  render() {
    return (
      <div className='movie-form'>
        <form onSubmit={this.submitHandler}>
          <input placeholder='Enter movie name' type='string' name='title' value={this.state.inputMovie.name} onChange={this.inputHandler} required />
          <input placeholder='Enter director name' type='string'name='director' value={this.state.inputMovie.director} onChange={this.inputHandler} required />
          <input placeholder='Enter metascore' type='number' name='metascore' value={this.state.inputMovie.metascore} onChange={this.inputHandler} required />
          <input placeholder='Enter stars name (separated by comma)' type='text' name='stars' value={this.state.inputMovie.stars} onChange={this.inputHandler} required />
          <button>Add Movie</button>
        </form>
      </div>
    )
  }
}

export default MovieForm;