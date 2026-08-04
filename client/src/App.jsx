// client/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";
import Services from "./pages/Services";
import CategoryDetail from "./pages/CategoryDetail";
import DocumentChecklist from "./pages/DocumentChecklist";
import GNDivisionList from "./pages/GNDivisionList";
import GNDetails from "./pages/GNDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/:categorySlug" element={<CategoryDetail />} />
        <Route path="/services/:categorySlug/:subServiceSlug" element={<DocumentChecklist />} />

        <Route path="/grama-niladhari" element={<GNDivisionList />} />
        <Route path="/grama-niladhari/details" element={<GNDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
