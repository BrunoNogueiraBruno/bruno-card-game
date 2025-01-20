import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './styles/global.css';
import Room from './views/Room';

const ROOM_ID = import.meta.env.VITE_ROOM_ID as string

const Container = styled.div`
`;

function App() {

  return (
    <Container>
      <Router>
        <Routes>
          <Route path={`/room/${ROOM_ID}`} element={<Room host={false} />} />
          <Route path={`/host/${ROOM_ID}`} element={<Room host={true} />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
