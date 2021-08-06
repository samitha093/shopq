import {BrowserRouter,Switch, Route} from 'react-router-dom';
import './Styles/App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Notfound from './Pages/Notfound';
import User from './Pages/User';
import Seller from './Pages/Seller';
import Store from './Pages/Store';
import Item from './Pages/Item';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import PublicRoutes from './Routes/PublicRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/contact" component={Contact}/>
        <PublicRoutes path="/login" component={Login}/>
        <Route path="/item/:id" component={Item}/>
        <PrivateRoutes path="/seller" component={Seller}/>
        <PrivateRoutes path="/user" component={User}/>
        <Route path="/store/:id" component={Store}/>
        <PrivateRoutes path="/cart" component={Cart}/>
        <Route path="/checkout" component={Checkout}/>
        <Route  component={Notfound}/>
      </Switch>
      </div>
      
       
    </BrowserRouter>
  );
}

export default App;
