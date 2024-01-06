import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Home/Home";
// import Create from "./Create/Create";
import "./App.css";

function App() {
  return (
    <div>
      <header></header>
        <Router>
          <Routes>
            <Route exect path='/' element={ <Home /> } />
            {/* <Route exect path='/create' element={ <Create /> } /> */}
          </Routes>
        </Router>
        
    </div>
  );
}

export default App;
