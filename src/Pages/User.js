import {Switch, Route} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {endsession, getusername ,gettoken} from '../Session/Session';
import Usersidebar from '../Components/Usersidebar';
import Account from './Buyer/Account';
import Ordeers from './Buyer/Orders';
import Address from './Buyer/Address';
import Createstore from './Buyer/Createstore';
import '../Styles/Seller.css';
const User = ({sn}) => {
    const history = useHistory();
    async function test(){
        history.push("/seller");
    }
    const {id} = useParams()
    return (
        // <div>
        //     <h1>user : {getusername()}</h1>
        //     <button onClick={user_logout}>logout</button>
        //     <button onClick={test}>Seller Hub</button>
        // </div>
        <div className="seller-background">
            <Usersidebar/>
            <Switch>
                <Route path="/user/" component={Ordeers} exact/>
                <Route path="/user/account" component={Account}/>
                <Route path="/user/address" component={Address}/>
                <Route path="/user/createstore" component={Createstore}/>
            </Switch>
        </div>
    )
}

export default User
