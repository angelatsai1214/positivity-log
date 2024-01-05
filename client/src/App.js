import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Home/Home";

function App() {
  return (
    <div>
      <header></header>
        <Router>
          <Routes>
            <Route exect path='/' element={ <Home /> } />
          </Routes>
        </Router>
        
    </div>
  );
}

export default App;
