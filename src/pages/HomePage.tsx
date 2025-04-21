import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron text-center bg-light p-5 rounded">
        <h1 className="display-4">Welcome to the Entertainment Agency</h1>
        <p className="lead">
          We provide top-notch entertainment services for all types of events and occasions.
        </p>
        <hr className="my-4" />
        <p>
          Browse our talented entertainers and find the perfect match for your next event.
        </p>
        <Link to="/entertainers" className="btn btn-primary btn-lg">
          View Entertainers
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
