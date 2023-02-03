import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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
    console.log("Submitted");
  };

  render() {
    const { match, history } = this.props;

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
        {/* <button
          className="btn btn-primary"
          onClick={() => history.push("/movies")}
        >
          Save
        </button> */}
      </div>
    );
  }
}

export default MovieForm;
