import Featured from '../../components/featured/Featured';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Navbar from '../../components/navbar/Navbar';
import Properties from '../../components/properties/Properties';
import PropertyList from '../../components/propertyList/PropertyList';
import './home.css';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <div className="homeTitle h1">Hotels type</div>
        <PropertyList/>
        <div className="homeTitle h1">Featured hotels</div>
        <Properties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home