import React from "react";

const ListGroup = (props) => {
  const { countGenres, genres } = props;
  if (countGenres === 1) return null;
  return (
    <ul className="list-group">
      <li className="list-group-item">All Genres</li>
      {genres.map((genre) => (
        <li key={genre.name} className="list-group-item">
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
