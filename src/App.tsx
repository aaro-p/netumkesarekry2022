import React from 'react';
import './App.css';
import PersonTable from "./components/PersonTable";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
        <Header/>
        <PersonTable/>
        <Footer/>
    </div>
  );
}

export default App;
