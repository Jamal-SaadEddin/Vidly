import React from "react";

const ListGroup = (props) => {
  const { countGenres, genres, currentGenre, onGenreChange } = props;
  if (countGenres === 1) return null;
  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      {genres.map((genre) => (
        <li
          key={genre.name}
          className={
            currentGenre === genre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreChange(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
