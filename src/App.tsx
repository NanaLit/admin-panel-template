import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeProvider from './context/ThemeProvider';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* Добавьте другие маршруты здесь */}
            </Routes>
        </ThemeProvider>
    </Router>
  );
}

export default App;
