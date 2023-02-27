import './App.css';
import Navbar from './components/Header'
import Footer from './components/Footer'
import Header from './components/Header';
import AppRouter from './router/AppRouter'


function App() {
  return (
    <div className="app">
      <Header />
      <div className='main'>
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
}

export default App;
