
import './App.css';
import Contact from './sections/Contact';
import Courses from './sections/Courses';
import Footer from './sections/Footer';
import FunFacts from './sections/FunFacts';
import Header from './sections/Header';
import Home from './sections/Home';
import Reviews from './sections/Reviews';
import Whyus from './sections/Whyus';

function App() {
  return (
    <div className="app">
      <Header />
      <Home />
      <Whyus />
      <Courses />
      <FunFacts />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
