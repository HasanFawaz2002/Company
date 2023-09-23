import React,{useState}from "react";

import "./Contactus.css";

const contactstyles = {
  WebkitBoxSizing: "border-box",
  MozBoxSizing: "border-box",
  boxSizing: "border-box",

  margin: 0,
  padding: 0,
  paddingTop: 50,
  textTransform: "capitalize",
  backgroundColor: "#2d3741",
  scrollBehavior: "smooth",
};


const Contactus = () => {
    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      subject: "",
      message: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      // Send the form data to the backend route /sendEmail
      fetch("http://localhost:3001/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle success or error here
        })
        .catch((error) => {
          console.error(error);
          // Handle error here
        });
    };
  return (
    <div style={contactstyles}>
      <div className="about-us">
        <div className="aboutuscontainer">
          <div className="aboutwrapper">
            {/* <div className="about-usContent">
              <h1>
                welcome <b>sultan</b>
              </h1>
              <div className="aboutinfo">
                <h2>about us</h2>
                <p>
                  If you have any questions, concerns, or encounter any issues
                  related to Zidiya Passport, please don't hesitate to reach out
                  to us. We're here to help!
                </p>
              </div>
            </div> */}
            <div className="contact-us">
              <h1>contact us</h1>
              <div className="contactform">
                <form onSubmit={handleSubmit}>
                  <div className="firstname-input">
                    <label>Firstname</label>
                    <input
                      className="firstnametext"
                      type="text"
                      placeholder="enter firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="lastname-input">
                    <label>Lastname</label>
                    <input
                      className="lastnametext"
                      type="text"
                      placeholder="enter lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="email-input">
                    <label>email</label>
                    <input
                      className="emailtext"
                      type="email"
                      placeholder="enter email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="subject-input">
                    <label>subject</label>
                    <input
                      className="subjecttext"
                      type="text"
                      placeholder="enter subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="message">
                    <label>message</label>
                    <textarea
                      className="messagetext"
                      name=""
                      placeholder="enter message"
                      id=""
                      cols="30"
                      rows="10"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="contact-submit-btn">
                    <button className="contact-submit" type="submit">
                      send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
