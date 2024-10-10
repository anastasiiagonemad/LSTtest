import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './components/search/Search';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
