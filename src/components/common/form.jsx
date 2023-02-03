import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import DropDown from "./dropDown";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, value, type = "text") {
    const { errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={this.getValue(value, name)}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  getValue = (value, name) => {
    const { data } = this.state;
    if (value) {
      data[name] = value;
      return value;
    }
    return data[name];
  };

  renderDropDown(name, label, options, value) {
    const { data, errors } = this.state;

    return (
      <DropDown
        name={name}
        label={label}
        options={options}
        value={this.getValue(value, name)}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
