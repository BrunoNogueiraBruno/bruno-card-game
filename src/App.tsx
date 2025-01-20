import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './styles/global.css';
import Room from './views/Room';

const Container = styled.div`
`;

function App() {

  return (
    <Container>
      <Router>
        <Routes>
          <Route path={`/room/123456`} element={<Room host={false} />} />
          <Route path={`/host/123456`} element={<Room host={true} />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
