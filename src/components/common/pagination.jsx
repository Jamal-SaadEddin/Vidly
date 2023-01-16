import React, { Component } from "react";

class Pagination extends Component {
  state = { paginations: [] };

  renderPagination = () => {
    const pages = Math.ceil(this.props.movies.length / 4);

    for (let index = 0; index < pages; index++) {
      this.state.paginations[index] = index + 1;
    }

    return (
      <ul className="pagination">
        {this.state.paginations.map((page) => (
          <li
            className="page-item"
            key={page}
            onClick={() => this.props.onPagination(page)}
          >
            <a className="page-link" href="#">
              {page}
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
