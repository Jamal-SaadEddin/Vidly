import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
    } = this.props.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.props.state.movies;
    const { pageSize, currentPage, sortColumn } = this.props.state;

    if (count === 0) return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.props.state.genres}
            selectedItem={this.props.state.selectedGenre}
            onItemSelect={this.props.onGenreSelect}
          />
        </div>
        <div className="col">
          <Link to="/movies/new">
            <button className="btn btn-primary">New Movie</button>
          </Link>
          <p style={{ marginTop: "20px" }}>
            Showing {totalCount} movies in the database.
          </p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.props.onDelete}
            onLike={this.props.onClick}
            onSort={this.props.onSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.props.onPageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
