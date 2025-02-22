import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from '../MovieDetails/MovieDetails';
import HomePage from '../Home_page/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
