import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './pages/Signup.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './pages/MyOrder.js';

function App() {
  return (
    <CartProvider>
    <Router>
      <>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/createuser" element={<Signup/>}/>
        <Route exact path="/myOrder" element={<MyOrder />}/>
      </Routes>
      </>
    </Router>
    </CartProvider>
  );
}

export default App;
