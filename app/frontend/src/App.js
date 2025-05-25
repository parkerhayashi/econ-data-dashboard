import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SectorPage from "./pages/SectorPage";
import SeriesPage from "./pages/SeriesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sector/:id" element={<SectorPage />} />
        <Route path="/sector/:sectorId/:seriesId" element={<SeriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;