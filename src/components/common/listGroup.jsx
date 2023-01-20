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

// The reason of this change: is that assume we have
// a lot of ListGrouo components at the movies component,
// so we don't have to repeat passing these props at each component,
// so to reduce code writing and complexity of passing them manually.
// we added them here for only one time, and we got the same results.
ListGroup.defaultProps = {
  valueProperety: "_id",
  textProperety: "name",
};

export default ListGroup;
