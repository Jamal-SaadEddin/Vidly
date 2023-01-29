import React from "react";

const DropDown = ({ name, label, options, error, ...rest }) => {
  let v = 0;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        {...rest}
        name={name}
        className="custom-select"
        id="inputGroupSelect01"
      >
        <option defaultValue={v++}></option>
        {options.map((option) => (
          <option key={option._id} value={v++}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDown;
