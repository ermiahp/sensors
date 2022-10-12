import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MenuDrawer from "./components/MenuDrawer/MenuDrawer";
import Sensor from "./components/Sensor/Sensor";
import "./styles/colors.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <MenuDrawer />
        <div className="frame">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/sensor" element={<Sensor />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
