import React, { useState, useEffect } from "react";
import "./Institutions.css";
import { BsThreeDots } from "react-icons/bs";
import Image1 from "../../images/image1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";
import { FaUpload, FaRegHandPointer,FaArrowRight  } from "react-icons/fa";
import axios from "axios";

const useParallaxBanner = (setScrollPosition) => {
  const handleScroll = () => setScrollPosition(window.pageYOffset);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

function Institutions() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const [institutions, setInstitutions] = useState([]); // Initialize as an empty array

  // Fetch the list of institutions from the API
  useEffect(() => {
    axios
      .get("http://localhost:3001/getLastThreeInstitutions")
      .then((response) => {
        // Update the institutions state with the fetched data
        setInstitutions(response.data.institutions);
        console.log(response.data.institutions);
      })
      .catch((error) => {
        console.error("Error fetching institutions:", error);
        // Handle the error, e.g., set institutions to an empty array
        setInstitutions([]);
      });
  }, []);

  useParallaxBanner(setScrollPosition);
  return (
    <>
      <section
        style={{
          backgroundSize: `${(window.outerHeight - scrollPosition) / 3}%`,
        }}
        className="banner"
      >
        <h1>Upload, Request and Get Approved</h1>
      </section>

      <div className="institutions-container">
        <h1>Interact with Our Institutions</h1>
        <div className="aboutus-section-institution">
          <div className="aboutus-section-content2">
            <div className="aboutus-section-content2-left">
              <h1>Simple</h1>
              <p>
                Zidyia provides an easy to use platform with the best user
                experience
              </p>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                Engaging course content composed of quizzes and grades.
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                Data and insights to analyze integration with course content.
              </li>
            </div>
            <img src={Image1} alt="" />
          </div>
        </div>

        <div className="parents-container">
          {institutions.map((institution) => (
            <div className="card red" key={institution._id}>
              <h1 className="tip">{institution.name}</h1>
              <h3 className="second-text">{institution.email}</h3>
              <h3 className="second-text">{institution.location}</h3>
              <div className="buttons-container">
                <button>
                  <FaUpload /> Upload
                </button>
                <button>
                  <FaRegHandPointer /> Request
                </button>
                <button>
                  More <BsThreeDots className="third" />{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all-button">View All <FaArrowRight  /></button>
      </div>

    </>
  );
}

export default Institutions;
