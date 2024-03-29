import React from "react";

const ListGroup = ({
  items,
  valueProperety,
  textProperety,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperety]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperety]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperety: "_id",
  textProperety: "name",
};

export default ListGroup;
