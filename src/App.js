import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import the components
import Home from './Home'; // Ensure you have the correct path to Home.js
import Experience from './Experience'; // Ensure you have the correct path to Experience.js
import Landing from './Landing';

function App() {
  return (
    <Router>
      <Landing />
      <Routes>
      <Route path="/home" element={<Home />} />
        {/* ... other routes ... */}
      </Routes>
      <Home />
      <Experience />
      {/* ... other sections */}
    </Router>
  );
}

export default App;


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/home" element={<Home />} />
//         {/* ... other routes */}
//       </Routes>
//       <Home />
//       <Experience />
//       {/* ... other sections */}
//     </Router>
//   );
// }

// export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
