import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext.js";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading } = useFetch(`/hotels/find/${id}`);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const { dates, options } = useContext(SearchContext);

  const milliSecondPerDay = 1000 * 60 * 60 * 24;
  function dayDiff(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / milliSecondPerDay);
    return diffDays;
  }

  const days = dayDiff(dates[0].endDate, dates[0].startDate);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else if (days <= 0) {
      alert("Please choose a vacation date");
    } else if (!options.room) {
      alert("No rooms available");
    } else {
      setOpenModal(true);
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>
              Reserve or Book Now !
            </button>
            <div className="noDates" id="noDates"></div>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from centre
            </span>
            <span className="hotelPriceHigh">
              Book a stay over {data.cheapestPrice} € at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div className="hotelImgWrapper" key={index}>
                  <img
                    onClick={() => handleOpen(index)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <div className="hotelTitle">{data.title}</div>
                <div className="hoteldesc">{data.desc}</div>
              </div>
              <div className="hotelDetailsPrice">
                <div className="h1">
                  Perfect for a {days > 1 ? days + "-nights" : days + "-night"}{" "}
                  staying
                </div>
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, cumque?
                </span>
                <div className="h2">
                  <b>{data.cheapestPrice * days * options.room} €</b>
                  &nbsp; ({days > 1 ? days + " nights" : days + " night"})
                </div>
                <button onClick={handleClick}>Reserve or Book Now !</button>
                <div className="noDates"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
      <MailList />
      <Footer />
    </div>
  );
};

export default Hotel;
