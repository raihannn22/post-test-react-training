import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Apps from "./pages/Apps";
import Dashboard from "./pages/Dashboard";
import TodoPage from "./pages/ToDo";
import Category from "./pages/Category";

function App() {
  return (
    <Router>
      <Apps />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </Router>
  );
}

export default App;
