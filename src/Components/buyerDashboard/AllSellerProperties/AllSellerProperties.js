import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { token } from "../../../Hooks/UserHooks";
import { APP_CONFIG } from "../../../config";
const AllSellerProperties = () => {
  const [properties, setProperties] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios.get(`${APP_CONFIG.backendUrl}api/user-properties`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
        // console.log(response)
      })
      .catch((error) => {
        setError(error.response ? error.response.data : error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Seller Properties</h2>
      <div>
        {properties?.buy?.length > 0 && (
          <div>
            {/* <h3>Buy Properties</h3> */}
            <ul>
              {properties.buy.map((property) => (
                <li key={property._id}>{property.name}</li>
              ))}
            </ul>
          </div>
        )}

        {properties?.rent?.length > 0 && (
          <div>
            <h3>Rent Properties</h3>
            <ul>
              {properties.rent.map((property) => (
                <li key={property._id}>{property.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellerProperties;
