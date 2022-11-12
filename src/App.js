import './App.css';
import Address from './Pages/Address/Address';
import SavedAddress from './Pages/SavedAddress/SavedAddress';
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={< Address />} />
          <Route exact path="/saved" element={< SavedAddress />} />
        </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
