import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import AddNewSong from './AddNewSong';
import EditSong from './EditSong';
import Login from './Login';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/add-new-song" element={<AddNewSong />} />
        <Route path="/edit-song" element={<EditSong />} />
      </Routes>
    </Router>
  );

}
export default App;