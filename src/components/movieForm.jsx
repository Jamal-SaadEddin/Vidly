import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { genres, getGenre } from "./../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
  };

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
    const movie = {
      title: data.title,
      genre: { _id: getGenre(data.genre)._id, name: data.genre },
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate,
    };

    this.props.onAddNewMovie(movie);

    const { history } = this.props;

    history.push("/movies");

    console.log("Submitted");
  };

  render() {
    const { match } = this.props;
    const _id = match.params._id;
    const movies = this.props.movies;
    let movie = movies.filter((m) => m._id === _id);
    movie = { ...movie };
    console.log(movie);

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", movie.title)}
          {this.renderDropDown("genre", "Genre", genres, movie.genre.name)}
          {this.renderInput(
            "numberInStock",
            "Number in Stock",
            movie.numberInStock
          )}
          {this.renderInput("dailyRentalRate", "Rate", movie.dailyRentalRate)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
