import "./featured.css";
import Paris from "../../assets/images/paris.jpg";
import London from "../../assets/images/london.jpg";
import Dublin from "../../assets/images/dublin.jpg";

import useFetch from "../../hooks/useFetch.js";

const Featured = () => {
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=london,paris,dublin"
  );

  return (
    <div className="featured">
      {loading ? (
        "loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src={London} alt="London city" className="featuredImg" />
            <div className="featuredTitle">
              <div className="h1">London</div>
              <div className="h2">{data[0]} properties</div>
            </div>
          </div>
          <div className="featuredItem">
            <img src={Paris} alt="Paris city" className="featuredImg" />
            <div className="featuredTitle">
              <div className="h1">Paris</div>
              <div className="h2">{data[1]} properties</div>
            </div>
          </div>
          <div className="featuredItem">
            <img src={Dublin} alt="Dublin city" className="featuredImg" />
            <div className="featuredTitle">
              <div className="h1">Dublin</div>
              <div className="h2">{data[2]} properties</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
