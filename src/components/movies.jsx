import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    moviesPage: getMovies().slice(0, 4),
  };

  handlePagination = (page) => {
    let index = page * 4 - 4;
    const moviesPage = this.state.movies.slice(index, index + 4);
    this.setState({ moviesPage });
  };

  handleClick = (movie) => {
    const movies = [...this.state.moviesPage];
    const index = this.state.moviesPage.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    this.setState(
      this.state.moviesPage.splice(this.state.moviesPage.indexOf(movie), 1)
    );
  };

  renderTable() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database</p>;
    return (
      <React.Fragment>
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.moviesPage.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleClick(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          movies={this.state.movies}
          onPagination={(page) => this.handlePagination(page)}
        />
      </React.Fragment>
    );
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default Movies;
