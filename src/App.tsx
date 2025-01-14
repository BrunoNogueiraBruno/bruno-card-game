import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import './styles/global.css';

import Login from './views/Login';
import Room from './views/Room';

const Container = styled.div`
`;

function App() {

  return (
    <Container>
      <Router>
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<Login />} />
          {/* Página de sala */}
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
