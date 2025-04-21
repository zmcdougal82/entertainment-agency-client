import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEntertainer } from '../services/api';
import { Entertainer } from '../models/Entertainer';

const EntertainerFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Partial<Entertainer>>({
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEMailAddress: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntertainer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!entertainer.entStageName) {
      setError('Stage name is required');
      return;
    }

    try {
      setSubmitting(true);
      await createEntertainer(entertainer as Entertainer);
      navigate('/entertainers');
    } catch (error) {
      console.error('Error adding entertainer:', error);
      setError('Failed to add entertainer. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Entertainer</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="entStageName" className="form-label">Stage Name*</label>
          <input
            type="text"
            className="form-control"
            id="entStageName"
            name="entStageName"
            value={entertainer.entStageName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="entSSN" className="form-label">SSN</label>
          <input
            type="text"
            className="form-control"
            id="entSSN"
            name="entSSN"
            value={entertainer.entSSN}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="entStreetAddress" className="form-label">Street Address</label>
          <input
            type="text"
            className="form-control"
            id="entStreetAddress"
            name="entStreetAddress"
            value={entertainer.entStreetAddress}
            onChange={handleChange}
          />
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="entCity" className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              id="entCity"
              name="entCity"
              value={entertainer.entCity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="entState" className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              id="entState"
              name="entState"
              value={entertainer.entState}
              onChange={handleChange}
              maxLength={2}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="entZipCode" className="form-label">Zip Code</label>
            <input
              type="text"
              className="form-control"
              id="entZipCode"
              name="entZipCode"
              value={entertainer.entZipCode}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="entPhoneNumber" className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="entPhoneNumber"
            name="entPhoneNumber"
            value={entertainer.entPhoneNumber}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="entWebPage" className="form-label">Website</label>
          <input
            type="url"
            className="form-control"
            id="entWebPage"
            name="entWebPage"
            value={entertainer.entWebPage}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="entEMailAddress" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="entEMailAddress"
            name="entEMailAddress"
            value={entertainer.entEMailAddress}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3 d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Adding...' : 'Add Entertainer'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/entertainers')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntertainerFormPage;
