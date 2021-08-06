import {Switch, Route} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Sellersidebar from '../Components/Sellersidebar';
import Products from './Seller/Products';
import Dashboard from './Seller/Dashboard';
import Orders from './Seller/Orders';
import '../Styles/Seller.css';
const Seller = () => {
    const {id} = useParams()
    return (
        <div className="seller-background">
            <Sellersidebar/>
            <Switch>
                <Route path="/seller/" component={Dashboard} exact/>
                <Route path="/seller/products" component={Products}/>
                <Route path="/seller/orders" component={Orders}/>
            </Switch>
        </div>
    )
}

export default Seller

