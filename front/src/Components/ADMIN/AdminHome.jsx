import React,{useState,useEffect} from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
 import { useNavigate } from 'react-router-dom';
 import axios from 'axios';
 import { CirclesWithBar } from 'react-loader-spinner';
 import {motion} from 'framer-motion';




const Home = () => {

    const token = localStorage.getItem("access_token");
    const [certificateData, setCertificateData] = useState([]);
    const [certificateData2, setCertificateData2] = useState([]);
    const [certificateData3, setCertificateData3] = useState(0);
    const navigate = useNavigate();

    const [institutionData, setInstitutionData] = useState('');


  useEffect(() => {
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };

    axios.get('http://localhost:3001/getInstitution', config)
      .then(response => {
        setInstitutionData(response.data.institution);
        console.log(response.data.institution);
      })
      .catch(error => {
        console.error('Error fetching institution data:', error);
      });
  }, []);

    const [isLoadingData, setIsLoadingData] = useState(true); // Separate loading state for data
  
    // Function to fetch certificate uploads count for intitution from the server
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/certificateUploadRoute/count', {
              headers: {
                token: `Bearer ${token}`, // Include the token in the header
              },
            });
            // Structure the data as you described
            const structuredData = {
              name: 'certificate Uploads',
              pending: response.data.certificateCounts.Pending,
              rejected: response.data.certificateCounts.Rejected,
              approved: response.data.certificateCounts.Approved,
              total: response.data.certificateCounts.totalCertificates,
            };
      
            setCertificateData(structuredData);
            setIsLoadingData(false);
            console.log(response.data.certificateCounts); // Move the log here
          } catch (error) {
            if (error.response && error.response.status === 403) {
              console.log("Token is not valid!");
              navigate('/Institutionlogin');
            } else {
              console.error("Error Fetching Data:", error);
            }
          }
        };
      
        fetchData();
      }, []);

    // Function to fetch certificate request count for intitution from the server
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/getCertificateRequestsCount', {
            headers: {
              token: `Bearer ${token}`, // Include the token in the header
            },
          });
          // Structure the data as you described
          const structuredData2 = {
            name: 'certificate Request',
            pending: response.data.requestCounts.Pending,
            rejected: response.data.requestCounts.Rejected,
            approved: response.data.requestCounts.Approved,
            total: response.data.requestCounts.totalRequests,
          };
    
          setCertificateData2(structuredData2);
          setIsLoadingData(false);
          console.log(response.data.requestCounts); // Move the log here
        } catch (error) {
          if (error.response && error.response.status === 403) {
            console.log("Token is not valid!");
            navigate('/Institutionlogin');
          } else {
            console.error("Error Fetching Data:", error);
          }
        }
      };
    
      fetchData();
    }, []);


    // Function to fetch certificate  count for intitution from the server
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/countTotalCertificates', {
            headers: {
              token: `Bearer ${token}`, // Include the token in the header
            },
          });
          
          setCertificateData3(response.data);
          console.log(response.data); // Move the log here
        } catch (error) {
          if (error.response && error.response.status === 403) {
            console.log("Token is not valid!");
            navigate('/Institutionlogin');
          } else {
            console.error("Error Fetching Data:", error);
          }
        }
      };
    
      fetchData();
    }, []);
    


      const data = [
        {
          name: certificateData.name,
          pending: certificateData.pending,
          rejected: certificateData.rejected,
          approved: certificateData.approved,
          total: certificateData.total,
        },
        {
          name: certificateData2.name,
          pending: certificateData2.pending,
          rejected: certificateData2.rejected,
          approved: certificateData2.approved,
          total: certificateData2.total,
        }
      ];



      


  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
            {isLoadingData && (<CirclesWithBar
                               height="100"
                               width="100"
                               color="rgb(70, 241, 207)"
                               wrapperStyle={{}}
                               wrapperClass=""
                               visible={true}
                               outerCircleColor=""
                               innerCircleColor=""
                               barColor=""
                               ariaLabel='circles-with-bar-loading'
                               />)}
        </div>

        <div className='main-cards'
        >

            <motion.div className="card"
            variants={{
              hidden:{opacity: 0,x: 75},
              visible:{opacity: 1,x: 0},
            }}
            initial="hidden"
            animate="visible"
            transition={{duration:0.5,delay:0.2}}
            >
            <div className='card-inner'>
                <h3>Certificates</h3>
                <BsFillArchiveFill className='card-icon'/>
            </div>
            <h1>{certificateData3.totalCertificates}</h1>
            </motion.div>

            <motion.div className="card"
            variants={{
              hidden:{opacity: 0,x: 75},
              visible:{opacity: 1,x: 0},
            }}
            initial="hidden"
            animate="visible"
            transition={{duration:0.5,delay:0.4}}
            >
            <div className='card-inner'>
                <h3>Category</h3>
                <BsFillGrid3X3GapFill className='card-icon'/>
            </div>
            <h1>300</h1>
            </motion.div>

            

            <motion.div className="card"
            variants={{
              hidden:{opacity: 0,x: 75},
              visible:{opacity: 1,x: 0},
            }}
            initial="hidden"
            animate="visible"
            transition={{duration:0.5,delay:0.8}}
            >
            <div className='card-inner'>
                <h3>Profile</h3>
                <h2 className='card-icon'>{institutionData.name}</h2>
            </div>
            <div className="card-inner">
            <h2>{institutionData.email}</h2>
            <h2>{institutionData.location}</h2>
            </div>
            </motion.div>
            
        </div>
        {/* End Of Card*/ }
        
        <div className="charts">
          
        <ResponsiveContainer width="100%" height="100%" >
          {isLoadingData ? <h1>loading</h1>: (
            < BarChart
              width={500}
              height={300}
              data={data} 
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pending" fill="#8884d8" />
              <Bar dataKey="rejected" fill="#e26031" />
              <Bar dataKey="approved" fill="#10d74c" />
              <Bar dataKey="total" fill="#b3d450" />
            </BarChart>
          )}
            
          
        </ResponsiveContainer>
      </div>

    </main>
  )
}

export default Home