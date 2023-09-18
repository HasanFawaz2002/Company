import axios from 'axios';
import './StudentViewSubs.css'
import React, { useState, useEffect } from "react";

const StudentViewSubs = () => {
const [organizations, setOrganizations]= useState([])

    useEffect(() => {
        axios
          .get("http://localhost:3001/getAllSubscriptions")
          .then((response) => {
            // Update the institutions state with the fetched data
            setOrganizations(response.data.subscriptions);
            console.log(response.data.subscriptions);
          })
          .catch((error) => {
            console.error("Error fetching organizations:", error);
            // Handle the error, e.g., set institutions to an empty array
            setOrganizations([]);
          });
      }, []);
  return (
    <div className="backgroundSS">
<div className='gridSS'>
{organizations.map((organization) => (
<div className='cardSS'>
<div className='orgNameRow'>{organization.name}</div>

</div>
))}
</div>






    </div>
  )
}

export default StudentViewSubs