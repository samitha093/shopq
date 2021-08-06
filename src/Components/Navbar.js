import '../Styles/Navbar.css';
import {Link} from 'react-router-dom';
const Navbar = () => {
    return (
        <div className="topnav">
            <h1 className ="logo">Shopq</h1>
            <ul className ="nav">
                <li className ="nav-item">
                    <Link to='/'>Home</Link>
                </li>
                <li  className ="nav-item">
                    <Link to='/login'>My Account</Link>
                </li>
                <li  className ="nav-item">
                    <Link to='/cart'>Cart</Link>
                </li>
            </ul>
        </div>
        
    )
}

export default Navbar
