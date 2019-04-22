import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieCard from './MovieCard';
import Settings from './Settings';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    fetch(Settings.API_URL + 'Favorites?api_key=' + Settings.API_KEY)
      .then((resp) => resp.json())
      .then(data => {
        this.setState({ movies: data.records })
      }).catch(err => {
        // Error 🙁
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">

            {this.state.movies.map(movie => <MovieCard {...movie.fields} /> )}

        </div>
      </div>
    );
  }
}

export default App;
