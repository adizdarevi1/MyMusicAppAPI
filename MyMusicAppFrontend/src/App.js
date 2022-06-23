import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

import Home from './Home';
import AddNewSong from './AddNewSong';
import EditSong from './EditSong';
import Login from './Login';


function App() {

    return(
      <Router>
        <Routes>
          <Route path="/home/:id" element = {<Home />} />
        </Routes>
        <Routes>
          <Route path="/login" element = {<Login />} />
        </Routes>
        <Routes>
          <Route path="/add-new-song" element = {<AddNewSong />} />
        </Routes>
        <Routes>
          <Route path="/edit-song" element = {<EditSong />} />
        </Routes>
      </Router>
    );

}
export default App;