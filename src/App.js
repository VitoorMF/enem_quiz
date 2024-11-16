import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import HomeBody from './components/body/Body';
import QuizPage from './components/quiz/QuizPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeBody />} /> {/* Rota inicial */}
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
