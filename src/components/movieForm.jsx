import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { genres, getGenre } from "./../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    firstRender: true,
  };

  v = 1;

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  doSubmit = () => {
    // Call the server
    const { data } = this.state;
    const { history, onAddNewMovie, onEditMovie } = this.props;
    const _id = this.getMovieId();

    const movie = {
      _id,
      title: data.title,
      genre: { _id: getGenre(data.genre)[0]._id, name: data.genre },
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate,
    };

    if (_id === "new") {
      movie._id = `${this.v++}`;
      onAddNewMovie(movie);
    } else onEditMovie(movie);

    history.push("/movies");

    console.log("Submitted");
  };

  getMovieId() {
    const { match } = this.props;
    const _id = match.params._id;
    return _id;
  }

  render() {
    const _id = this.getMovieId();
    if (_id === "new") return this.renderMovieForm();

    if (this.state.firstRender) {
      const movies = this.props.movies;
      let movie = movies.filter((m) => m._id === _id);
      movie = [...movie];
      this.state.firstRender = false;
      return this.renderMovieForm(movie[0]);
    }

    return this.renderMovieForm();
  }

  renderMovieForm(movie) {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", movie ? movie.title : null)}
          {this.renderDropDown(
            "genre",
            "Genre",
            genres,
            movie ? movie.genre.name : null
          )}
          {this.renderInput(
            "numberInStock",
            "Number in Stock",
            movie ? movie.numberInStock : null
          )}
          {this.renderInput(
            "dailyRentalRate",
            "Rate",
            movie ? movie.dailyRentalRate : null
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
