import {Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import Homepage from "./components/Homepage";


function App() {


  return (
    <div className="App">
      <Routes>
          <Route path="/" element={ <Welcome /> } />
          <Route path='/homepage' element={ <Homepage/> } />
      </Routes>
      <footer>
        made by Temiloluwa, 2023
      </footer>
    </div>
  );
}

export default App;
