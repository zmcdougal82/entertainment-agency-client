import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEntertainers } from '../services/api';
import { EntertainerListItem } from '../models/Entertainer';

const EntertainersListPage: React.FC = () => {
  const [entertainers, setEntertainers] = useState<EntertainerListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntertainers = async () => {
      try {
        const data = await getEntertainers();
        setEntertainers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching entertainers:', error);
        setError('Failed to load entertainers. Please try again later.');
        setLoading(false);
      }
    };

    fetchEntertainers();
  }, []);

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Entertainment Talent Roster</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Stage Name</th>
              <th>Number of Bookings</th>
              <th>Last Booking Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entertainers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">No entertainers found</td>
              </tr>
            ) : (
              entertainers.map((entertainer) => (
                <tr key={entertainer.entertainerID}>
                  <td>{entertainer.entStageName}</td>
                  <td>{entertainer.bookingCount}</td>
                  <td>{entertainer.lastBookingDate || 'Never booked'}</td>
                  <td>
                    <Link 
                      to={`/entertainers/${entertainer.entertainerID}`} 
                      className="btn btn-sm btn-info me-2"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <Link to="/entertainers/new" className="btn btn-primary">
          Add Entertainer
        </Link>
      </div>
    </div>
  );
};

export default EntertainersListPage;
