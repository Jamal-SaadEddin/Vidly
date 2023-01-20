import React from "react";

const ListGroup = (props) => {
  const { items, valueProperety, textProperety } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li key={item[valueProperety]} className="list-group-item">
          {item[textProperety]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
