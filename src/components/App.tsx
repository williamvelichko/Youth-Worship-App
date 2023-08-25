import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SongList from "./SongList";
import Song from "./Song";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/song/:id" element={<Song />} />
      </Routes>
    </div>
  );
};

export default App;
