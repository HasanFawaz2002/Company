import React, { useState,useEffect } from 'react';
import axios from 'axios'; 
import './Customizable Form.css';
import { useNavigate } from 'react-router-dom';

const CustomizableForm = () => {
    const [numberOfRows, setNumberOfRows] = useState(1);
    const [formFields, setFormFields] = useState([]); // Initialize with an empty array
    const [isFormDataFetched, setIsFormDataFetched] = useState(false);

    const [nameError, setNameError] = useState('');
    const [fetchedFormData, setFetchedFormData] = useState(null); // State to hold fetched form data
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    if(role !=='admin'){
      navigate('/');
    }

    useEffect(() => {
        // Fetch form data when the component mounts
        const fetchFormData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3001/getCustomizableFormByInstitution/${userId}`);
      
            if (response.status === 200) {
              // Set the fetched form data in state
              setFetchedFormData(response.data);
              setIsFormDataFetched(true); // Set the flag to true when data is fetched
              console.log(response.data);
            } else {
              console.error('Error fetching form data');
            }
          } catch (error) {
            console.error('Error fetching form data:', error);
          }
        };
      
        fetchFormData(); // Call the fetch function
      }, []);

      // Initialize formFields based on fetched data or default values
  useEffect(() => {
    if (fetchedFormData) {
      // If there is fetched data, use it to initialize formFields
      setFormFields(fetchedFormData.customizableForm.fields);
    } else {
      // Otherwise, initialize formFields with default values
      setFormFields([{ fieldName: '', fieldType: 'text', isRequired: true }]);
    }
  }, [fetchedFormData]);


  
    const handleFieldChange = (index, field, value) => {
      const updatedFields = [...formFields];
      updatedFields[index][field] = value;
      setFormFields(updatedFields);
    };
  
    const handleAddRow = (e) => {
      e.preventDefault();
      if (numberOfRows < 7) {
        setFormFields([...formFields, { fieldName: '', fieldType: 'text', isRequired: true }]);
        setNumberOfRows(numberOfRows + 1);
      }
    };
  
    const handleRemoveRow = (e) => {
      e.preventDefault();
      if (numberOfRows > 1) {
        const updatedFields = [...formFields];
        updatedFields.pop();
        setFormFields(updatedFields);
        setNumberOfRows(numberOfRows - 1);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Check if any "Name of Field" input is empty
      const isNameEmpty = formFields.some((field) => field.fieldName.trim() === '');
  
      if (isNameEmpty) {
        setNameError('Please fill in all field names.');
        return;
      }
  
      // Clear the error message if there are no empty field names
      setNameError('');
  
      // Create an object representing the form data
      const formData = {
        fields: formFields,
      };
  
      // Send a POST request to your server with the form data
      try {
        // Use Axios to send a POST request
        const response = await axios.post('http://localhost:3001/createCustomizableForm', formData, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
  
        if (response.status === 201) {
          // Handle success, e.g., display a success message
          console.log('Form submitted successfully');
          window.location.reload();
        } else {
          // Handle errors, e.g., display an error message
          console.error('Form submission failed');
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log("Token is not valid!");
          } else {
            console.error("Cart Add failed:", error);
          }      
        }
    };

    const handleDelete = async(e) => {
        e.preventDefault();

        try{
            // Use Axios to send a delete request
            const response = await axios.delete('http://localhost:3001/deleteCustomizableFormByInstitution',  {
              headers: {
                token: `Bearer ${token}`,
              },
            });
      
            if (response.status === 204 || response.status === 200) {
                // Handle success, e.g., display a success message
                console.log('Form Deleted successfully');
                window.location.reload();
              } else {
                // Handle errors, e.g., display an error message
                console.error('Form Deleting failed');
              }
        }catch (error) {
            if (error.response && error.response.status === 403) {
                console.log("Token is not valid!");
              } else {
                console.error("Cart Add failed:", error);
              }      
            } 
    };
  
    return (
      <>
        <div className="customizable-form-container">
          <div className="customizable-form-container-header">
            <h2>Add Your Request Form</h2>
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
  
          <table className="customizable-form-container-table">
            <thead>
              <tr>
                <th>Name of Field</th>
                <th>Type of Field</th>
                <th>Required</th>
              </tr>
            </thead>
            <tbody>
              {formFields && formFields.map((field, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={field.fieldName}
                      onChange={(e) => handleFieldChange(index, 'fieldName', e.target.value)}
                      disabled={isFormDataFetched}
                    />
                  </td>
                  <td>
                    <select
                      value={field.fieldType}
                      onChange={(e) => handleFieldChange(index, 'fieldType', e.target.value)}
                      disabled={isFormDataFetched}
                    >
                      <option value="text">text</option>
                      <option value="number">number</option>
                      <option value="email">email</option>
                      <option value="password">password</option>
                      <option value="file">file</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={field.isRequired ? 'true' : 'false'}
                      onChange={(e) => handleFieldChange(index, 'isRequired', e.target.value === 'true')}
                      disabled={isFormDataFetched}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="customizable-form-container-bottom">
            {!fetchedFormData && (
                <>
                <form onSubmit={handleAddRow}>
              <button type="submit">Add Row</button>
            </form>
            <form onSubmit={handleRemoveRow}>
              <button type="submit">Remove Row</button>
            </form>
            </>
            )}
            
            {fetchedFormData ? (
            // Render the update form button when fetched data is available
            <form onSubmit={handleDelete}>
                  <button style={{backgroundColor:'red'}} type='submit'>Delete Form</button>
            </form>
          ) : (
            // Render the submit form button when no fetched data
            <form onSubmit={handleSubmit}>
              <button type="submit">Submit Form</button>
            </form>
          )}
          </div>
        </div>
      </>
    );
  };
  
  export default CustomizableForm;
  