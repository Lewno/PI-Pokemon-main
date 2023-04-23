import Form from "./views/Form/Form";
import Landing from "./views/Landing/Landing";
import Detail from "./views/Detail/Detail";
import Home from "./views/Home/Home";

import { Routes,Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const {pathname} = useLocation();

  return (
    <div className="App">
      {pathname !== "/" && <NavBar/>} 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
