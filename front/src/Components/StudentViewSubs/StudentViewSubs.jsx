import axios from 'axios';
import './StudentViewSubs.css'
import { useState, useEffect } from "react";
import Tooltip from '../tooltip/tooltip';
// import {  ReactComponent as SvgUpload } from "../../images/icons"
const SvgUpload = require("../../images/icons/upload_1.svg").ReactComponent

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
      <div className="scrollable-containerSS">
<div className='gridSS'>
{organizations.map((organization) => (
<div className='cardSS'>
<div className='orgNameRow'>{organization.name}</div>
<div className='orgLocRow'> Located in: {organization.location}</div>
<div className='orgEmailRow'>Email: {organization.email}</div>
<div className='buttonRowSS'>

<Tooltip  text="Share your QR code">
<div className='buttonRowSS'><SvgUpload/></div>
</Tooltip>
</div>

</div>
))}
</div>






    </div>
    </div>
  )
}

export default StudentViewSubs