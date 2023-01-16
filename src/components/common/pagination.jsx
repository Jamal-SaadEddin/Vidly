import React, { Component } from "react";

class Pagination extends Component {
  state = { paginations: [] };

  renderPagination = () => {
    const pags = Math.ceil(this.props.movies.length / 4);

    for (let index = 0; index < pags; index++) {
      this.state.paginations[index] = index + 1;
    }

    return (
      <ul class="pagination">
        {this.state.paginations.map((pag) => (
          <li class="page-item">
            <a class="page-link" href="#">
              {pag}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <nav aria-label="Page navigation example">{this.renderPagination()}</nav>
    );
  }
}

export default Pagination;
