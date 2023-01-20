import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/ListGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
  };

  handleClick = (movie) => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    this.setState(
      this.state.movies.splice(this.state.movies.indexOf(movie), 1)
    );
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  renderTable() {
    const { length: countMovies } = this.state.movies;
    const { length: countGenres } = this.state.genres;
    const { pageSize, currentPage, movies: allMovies, genres } = this.state;

    if (countMovies === 0) return <p>There are no movies in the database</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <ListGroup countGenres={countGenres} genres={genres} />
        <p>Showing {countMovies} movies in the database.</p>
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
            {movies.map((movie) => (
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
          itemsCount={countMovies}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default Movies;
