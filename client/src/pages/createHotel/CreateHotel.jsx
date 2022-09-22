import "./createHotel.css";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Login from "../login/Login";

const CreateHotel = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [desc, setDesc] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const { user } = useContext(AuthContext);

  // Handle every hotel value

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
    setSubmitted(false);
  };
  const handleType = (e) => {
    setType(e.target.value);
    setSubmitted(false);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    setSubmitted(false);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setSubmitted(false);
  };
  const handleDistance = (e) => {
    setDistance(e.target.value);
    setSubmitted(false);
  };
  const handleDesc = (e) => {
    setDesc(e.target.value);
    setSubmitted(false);
  };
  const handleCheapestPrice = (e) => {
    setCheapestPrice(parseInt(e.target.value));
    setSubmitted(false);
  };

  //submit the new hotel

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      title === "" ||
      type === "" ||
      city === "" ||
      address === "" ||
      distance === "" ||
      cheapestPrice === "" ||
      desc === ""
    ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }

    try {
      axios.post(
        "http://localhost:8800/api/hotels",
        {
          name,
          title,
          type,
          city,
          address,
          distance,
          desc,
          cheapestPrice,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    setName("");
    setTitle("");
    setType("");
    setCity("");
    setAddress("");
    setDistance("");
    setDesc("");
    setCheapestPrice("");
  };

  // Show the success message

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <div>Hotel {name} successfully created !!</div>
      </div>
    );
  };

  // Show the error message

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <div>Please enter all the fields</div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {user && (
        <div className="create">
          <div className="cContainer">
            <h1 className="cTitle">Create an hotel</h1>

            <div className="cDiv">
              <input
                type="text"
                placeholder="Name"
                className="cInput"
                onChange={handleName}
                value={name}
              />
              <input
                type="text"
                placeholder="Title"
                className="cInput"
                onChange={handleTitle}
                value={title}
              />
            </div>
            <label htmlFor="type">Type :</label>
            <select
              name="type"
              id="hotelType"
              onChange={handleType}
              value={type}
            >
              <option value="" disabled>
                Please select your type
              </option>
              <option value="hotel">Hotel</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="cabin">Cabin</option>
              <option value="resort">Resort</option>
            </select>
            <div className="cDiv">
              <input
                type="text"
                placeholder="City"
                className="cInput"
                onChange={handleCity}
                value={city}
              />
              <input
                type="text"
                placeholder="Address"
                className="cInput"
                onChange={handleAddress}
                value={address}
              />
            </div>
            <div className="cDiv">
              <input
                type="text"
                placeholder="Distance"
                className="cInput"
                onChange={handleDistance}
                value={distance}
              />
              <input
                type="number"
                placeholder="Price"
                className="cInput"
                onChange={handleCheapestPrice}
                value={cheapestPrice}
              />
            </div>
            
            {/* <input type="file" placeholder="Upload hotel Photos" />  */}
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Description"
              onChange={handleDesc}
              value={desc}
            ></textarea>
            <button className="cButton" onClick={handleSubmit}>
              Create
            </button>
            <div className="messages">
              {errorMessage()}
              {successMessage()}
            </div>
          </div>
        </div>
      )}
      {!user && <Login page="create" />}
    </div>
  );
};

export default CreateHotel;
