import "./propertyList.css";
import Island from "../../assets/images/hotel-island.jpg";
import Hall from "../../assets/images/hall-hotel.jpg";
import Mountain from "../../assets/images/hotel-mountain.jpg";
import Resort from "../../assets/images/hotel-resort.jpg";
import Rooftop from "../../assets/images/hotel-rooftop.jpg";

import useFetch from "../../hooks/useFetch.js";

const PropertyList = () => {
  const { data, loading } = useFetch("/hotels/countByType");
  const images = [Island, Hall, Mountain, Resort, Rooftop];
  
  return (
    <div className="pList">
      {loading ? (
        "loading, please wait"
      ) : (
        <>
        
          {data &&
            images.map((image, i) => (
                
              <div className="pListItem" key={i}>
                <img src={image} alt="Hotel type" className="pListImg" />
                <div className="pListTitle">
                  <div className="firstTitle">{data[i]?.type}</div>
                  <div className="subTitle">{data[i]?.count} {data[i]?.type}</div>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
