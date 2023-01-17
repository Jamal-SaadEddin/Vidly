export function genre(movies, currentGenere) {
  if (currentGenere.name === "All Genres") return movies;
  return movies.filter((movie) => movie.genre.name === currentGenere.name);
}
