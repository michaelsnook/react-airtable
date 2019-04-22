import React from 'react';

const MovieCard = () => (
  <div className="card">
    <img className="card-img-top" src="https://via.placeholder.com/362x200" alt="Card cap" />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      <p className="card-text">
        <small className="text-muted">Last updated 3 mins ago</small>
      </p>
    </div>
  </div>
);

export default MovieCard;
