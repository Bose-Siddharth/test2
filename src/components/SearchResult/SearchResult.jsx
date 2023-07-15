import React, { useContext, useState } from "react";
import "./SearchResult.css";
// import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "../../icons";
import { Combobox } from "@headlessui/react";
import { useNavigate,Link } from "react-router-dom";
import { MyContext } from "../../store";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const schoolNames = [
  "KMPHS",
  "KMPHS High School",
  "KM High School",
  "KPA Model",
  "KVS High School",
  "Kanchrapara School",
  "Kalyani High School",
  "Halisahar high school",
  "Kalyani Central Model",
  "Kanchrapara New School",
  "Naihati High School",
];

const SearchResult = () => {

  const { studentData, setStudentData } = useContext(MyContext);
  console.log(studentData);

  const [PhoneNumber,setPhoneNumber] = useState("")
  const [SchoolName, setSchoolName] = useState("");
  const [query, setQuery] = useState("");

  const filteredSchool =
    query === ""
      ? schoolNames
      : schoolNames.filter((schoolName) => {
          return schoolName
            .toLocaleLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLocaleLowerCase().replace(/\s+/g, ""));
        });

  const navigate = useNavigate()
  
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:8000/api/search", {
        SchoolName,
        PhoneNumber,
      });
      setStudentData(data);

      navigate("/certificate");
    } catch (error) {}
  };

  return (
    <>
      <main className="search-result-container">
        <div className="search-result">
          <div className="left">
            <div className="hero-logo">
              <img src="/herologo.png" alt="" />
            </div>

            <p>Enter all the necessary info and Get your result.</p>

            <form className="form">
              {/* <input type="text" placeholder="School Name" /> */}

              <Combobox value={SchoolName} onChange={setSchoolName}>
                <Combobox.Input
                  onChange={(event) => setQuery(event.target.value)}
                  className="combo-input"
                  autoComplete="off"
                  placeholder="School Names"
                />

                <Combobox.Options className="combo">
                  {filteredSchool.length > 0 ? (
                    filteredSchool.slice(0, 8).map((school) => (
                      <Combobox.Option
                        key={school}
                        value={school}
                        className="option"
                      >
                        {({ active, selected }) => (
                          <div className={`${active ? "bg-green" : "bg-gray"}`}>
                            {school}
                          </div>
                        )}
                      </Combobox.Option>
                    ))
                  ) : (
                    <div style={{ fontSize: "var(--tertiary-font)" }}>
                      No SchoolName present
                    </div>
                  )}
                </Combobox.Options>
              </Combobox>

              <input 
              type="number" 
              placeholder="Mobile Number" 
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <button onClick={submitHandler}>Get your Result</button>

              <Link
                to="/forgot"
                style={{ color: "black", textDecoration: "none" }}
              >
                <p>Forgot mobile Number ?</p>
              </Link>

              <div>
                <img src="/herologo2.png" alt="" />
              </div>
            </form>
          </div>

          <div className="right">
            <div className="hero-img">
              <img src="/hero.png" alt="" />
            </div>
          </div>

          <div className="lower-div">
            <div className="inner-lower-div">
              <p>Platinum Sponsors</p>
              <div>
                <div>
                  <img src="/herologo3.png" alt="" />
                </div>
                <div>
                  <img src="/herologo4.png" alt="" />
                </div>
                <div>
                  <img src="/herologo5.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="social-links">
            <div>
              <img src="/wa.png" alt="" />
            </div>
            <div>
              <img src="/insta.png" alt="" />
            </div>
            <div>
              <img src="/fb.png" alt="" />
            </div>
            <div>
              <img src="/yt.png" alt="" />
            </div>
          </div>
        </div>
      </main>
      <div className="bar-line" />
      <div className="bar-line-2">
        <div className="inner-bar">
          <div>
            <p>Follow Us on</p>
            {/* <span>
              <FaFacebook />
              <FontAwesomeIcon icon={facebook} />
            </span>
            <span>
              <FaTwitter />
              <FontAwesomeIcon icon="fa-brands fa-twitter" />
            </span>
            <span>
              <FaInstagram />
              <FontAwesomeIcon icon="fa-brands fa-instagram" />
            </span>
            <span>
              <FaYoutube />
              <FontAwesomeIcon icon={faYoutu} />
            </span> */}
            <p>Taaza Tv</p>
            <p>To Watch Taaza Tv live download the mobile App</p>
          </div>

          <div>
            <div>
              <img src="/googleplay.webp" alt="" />
            </div>
            <div>
              <img src="/appstore.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="bar-line-3">
        <p>
          Taaza TV is available on Siti Cable (171), Hathway (214), GTPL (213)
          also on JIO TV / Daily Hunt.
        </p>
      </div>

      <div className="lower-div2">
        <img src="/sponsors.png" alt="" />
      </div>
    </>
  );
};

export default SearchResult;
