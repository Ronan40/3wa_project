import "./updateHotel.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useContext, useState } from "react";
import Header from "../../components/header/Header";
import { AuthContext } from "../../context/AuthContext";

import Login from "../login/Login";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateHotel = () => {
  const endpoint = useLocation();
  const id = endpoint.pathname.split("/")[2];

  const { user } = useContext(AuthContext);
  const { data } = useFetch(`/hotels/find/${id}`);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [desc, setDesc] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");

  const navigate = useNavigate();

  const updateItem = async () => {
    try {
      axios.put(
        `http://localhost:8800/api/hotels/${id}`,
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
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
    navigate("/handle-hotel");
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleDistance = (e) => {
    setDistance(e.target.value);
  };
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  const handleCheapestPrice = (e) => {
    setCheapestPrice(parseInt(e.target.value));
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {user && (
        <div className="update">
          <h1 className="cTitle">
            Edit <span>{data.name}</span>
          </h1>
          <div className="cContainer">
            <div className="cDiv">
              <div className="dflex">
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  className="cInput"
                  name="name"
                  value={name}
                  onChange={handleName}
                />
              </div>
              <div className="dflex">
                <label htmlFor="title">Title :</label>
                <input
                  type="text"
                  className="cInput"
                  name="title"
                  value={title}
                  onChange={handleTitle}
                />
              </div>
            </div>
            <label htmlFor="type">Type :</label>
            <select
              name="type"
              id="hotelType"
              value={type}
              onChange={handleType}
            >
              <option value="" disabled>Please select your type</option>
              <option value="hotel">Hotel</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="cabin">Cabin</option>
              <option value="resort">Resort</option>
            </select>
            <div className="cDiv">
              <div className="dflex">
                <label htmlFor="city">City :</label>
                <input
                  type="text"
                  className="cInput"
                  name="city"
                  value={city}
                  onChange={handleCity}
                />
              </div>

              <div className="dflex">
                <label htmlFor="address">Address :</label>
                <input
                  type="text"
                  className="cInput"
                  name="address"
                  value={address}
                  onChange={handleAddress}
                />
              </div>
            </div>
            <div className="cDiv">
              <div className="dflex">
                <label htmlFor="distance">Distance :</label>
                <input
                  type="text"
                  className="cInput"
                  name="distance"
                  value={distance}
                  onChange={handleDistance}
                />
              </div>
              <div className="dflex">
                <label htmlFor="price">Price :</label>
                <input
                  type="number"
                  className="cInput"
                  name="price"
                  value={cheapestPrice}
                  onChange={handleCheapestPrice}
                />
              </div>
            </div>
            {/*  <label htmlFor="featured">Featured :</label>
            <select name="featured" id="featured">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <input type="file" placeholder="Upload hotel Photos" /> */}
            <div className="dflex">
              <label htmlFor="desc">Description :</label>
              <textarea
                cols="30"
                rows="10"
                name="desc"
                value={desc}
                onChange={handleDesc}
              ></textarea>
            </div>

            <button className="cButton" onClick={updateItem}>
              Update
            </button>
          </div>
        </div>
      )}
      {!user && <Login page="update" />}
    </div>
  );
};

export default UpdateHotel;
