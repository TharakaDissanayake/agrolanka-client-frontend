
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
      <Zoom duration={1500}>  <About /></Zoom>
      <Bounce left duration={1000}> <Services /></Bounce>

      <Menu />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
