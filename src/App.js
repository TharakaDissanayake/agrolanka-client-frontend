
import './App.css';
import Contact from './sections/Contact';
import Services from './sections/Services';
import Footer from './sections/Footer';

import Header from './sections/Header';

import Menu from './sections/Menu';
import About from './sections/About';
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Bounce from "react-reveal/Bounce";
function App() {
  return (
    <div className="app">
      <Header />
      <Bounce duration={2000}><About /></Bounce>
      <Bounce right duration={2000}> <Services /></Bounce>

      <Bounce left duration={2000}><Menu /></Bounce>
      <Fade duration={2000}> <Contact /></Fade>
      <Footer />
    </div>
  );
}

export default App;
