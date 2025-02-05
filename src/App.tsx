import Navbar from "./components/Navbar";
import HeroPage from "./components/Hero";
import Feature from "./feature/Feature";
import Footer from "./components/Footer";
import ResultsPanel from "./feature/ResultPanel";

function App() {
  return (
    <>
      <Navbar />
      <HeroPage />
      <ResultsPanel />
      <Feature />
      <Footer />
    </>
  );
}

export default App;
