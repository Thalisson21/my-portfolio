import './App.css';
import Footer from './views/components/footer/Footer';
import Navbar from './views/components/navbar/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
