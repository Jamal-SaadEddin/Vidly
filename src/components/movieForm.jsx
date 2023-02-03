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
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropDown("genre", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
