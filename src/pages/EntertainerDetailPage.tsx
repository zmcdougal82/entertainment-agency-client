import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEntertainer, updateEntertainer, deleteEntertainer } from '../services/api';
import { Entertainer } from '../models/Entertainer';

const EntertainerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    const fetchEntertainer = async () => {
      if (!id) return;
      
      try {
        const data = await getEntertainer(parseInt(id));
        setEntertainer(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching entertainer:', error);
        setError('Failed to load entertainer details. Please try again later.');
        setLoading(false);
      }
    };

    fetchEntertainer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!entertainer) return;
    
    const { name, value } = e.target;
    setEntertainer({
      ...entertainer,
      [name]: value
    });
  };

  const handleSave = async () => {
    if (!entertainer || !id) return;
    
    try {
      setSaving(true);
      await updateEntertainer(parseInt(id), entertainer);
      setEditMode(false);
      setSaving(false);
    } catch (error) {
      console.error('Error updating entertainer:', error);
      setError('Failed to update entertainer. Please try again.');
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this entertainer?')) {
      try {
        setDeleting(true);
        await deleteEntertainer(parseInt(id));
        navigate('/entertainers');
      } catch (error) {
        console.error('Error deleting entertainer:', error);
        setError('Failed to delete entertainer. Please try again.');
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-center text-danger">{error}</div>;
  }

  if (!entertainer) {
    return <div className="container mt-5 text-center">Entertainer not found</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        {editMode ? 'Edit Entertainer' : 'Entertainer Details'}
      </h2>
      
      <div className="card">
        <div className="card-body">
          {editMode ? (
            <form>
              <div className="mb-3">
                <label htmlFor="entStageName" className="form-label">Stage Name</label>
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
                  value={entertainer.entSSN || ''}
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
                  value={entertainer.entStreetAddress || ''}
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
                    value={entertainer.entCity || ''}
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
                    value={entertainer.entState || ''}
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
                    value={entertainer.entZipCode || ''}
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
                  value={entertainer.entPhoneNumber || ''}
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
                  value={entertainer.entWebPage || ''}
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
                  value={entertainer.entEMailAddress || ''}
                  onChange={handleChange}
                />
              </div>
            </form>
          ) : (
            <dl className="row">
              <dt className="col-sm-3">Stage Name</dt>
              <dd className="col-sm-9">{entertainer.entStageName}</dd>
              
              <dt className="col-sm-3">SSN</dt>
              <dd className="col-sm-9">{entertainer.entSSN || 'N/A'}</dd>
              
              <dt className="col-sm-3">Address</dt>
              <dd className="col-sm-9">
                {entertainer.entStreetAddress ? (
                  <>
                    {entertainer.entStreetAddress}<br />
                    {entertainer.entCity}, {entertainer.entState} {entertainer.entZipCode}
                  </>
                ) : (
                  'N/A'
                )}
              </dd>
              
              <dt className="col-sm-3">Phone Number</dt>
              <dd className="col-sm-9">{entertainer.entPhoneNumber || 'N/A'}</dd>
              
              <dt className="col-sm-3">Website</dt>
              <dd className="col-sm-9">
                {entertainer.entWebPage ? (
                  <a href={entertainer.entWebPage} target="_blank" rel="noopener noreferrer">
                    {entertainer.entWebPage}
                  </a>
                ) : (
                  'N/A'
                )}
              </dd>
              
              <dt className="col-sm-3">Email Address</dt>
              <dd className="col-sm-9">
                {entertainer.entEMailAddress ? (
                  <a href={`mailto:${entertainer.entEMailAddress}`}>
                    {entertainer.entEMailAddress}
                  </a>
                ) : (
                  'N/A'
                )}
              </dd>
              
              <dt className="col-sm-3">Date Added</dt>
              <dd className="col-sm-9">{entertainer.dateEntered || 'N/A'}</dd>
            </dl>
          )}
          
          <div className="d-flex gap-2 mt-3">
            {editMode ? (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/entertainers')}
                >
                  Back to List
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainerDetailPage;
