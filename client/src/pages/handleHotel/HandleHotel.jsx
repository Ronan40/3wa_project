import "./handleHotel.css";
import useFetch from "../../hooks/useFetch.js";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useContext } from "react";
import Header from "../../components/header/Header";
import { AuthContext } from "../../context/AuthContext";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";

const HandleHotel = () => {
  const { data, loading, reFetch } = useFetch(`/hotels`);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/hotels/${id}`, {
        withCredentials: true,
      });
      console.log("Item successfully deleted.");
      reFetch();
    } catch (error) {
      alert(error);
    }
  };

  const navigateToUpdate = (id) => {
    navigate(`/update-hotel/${id}`);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading && <div>Loading</div>}
      {!loading && user && (
        <div className="hContainer">
          <div className="hWrapper">
            {data.map((item, key) => (
              <div className="hItem" key={key}>
                <img src={item.photos[0]} alt="hotel" className="siImg" />
                <div className="siDesc">
                  <h1 className="siTitle">{item.name}</h1>
                  <span className="siDistance">
                    {item.distance}m from centre
                  </span>
                  <span className="siTaxiOp">Free airport taxi</span>
                  <span className="siSubtitle">
                    Studio Apartment with Air conditioning
                  </span>
                  <span className="siFeatures">{item.desc}</span>
                  <span className="siCancelOp">Free cancellation </span>
                  <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today !
                  </span>
                </div>
                <div className="siDetails">
                  {item.rating && (
                    <div className="siRating">
                      <span>Excellent</span>
                      <button>{item.rating}</button>
                    </div>
                  )}
                  <div className="siDetailTexts">
                    <span className="siPrice">{item.cheapestPrice} €</span>
                    <br />
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <br />

                    <button
                      className="hCheckButton"
                      onClick={() => removeItem(item._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="hCheckButton"
                      onClick={() => navigateToUpdate(item._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!user && <Login page="delete" />}
    </div>
  );
};

export default HandleHotel;
