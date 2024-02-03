
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { Button } from 'bootstrap';
// import { AuthProvider } from './components/LoginPage';
import AuthContext from '../context/AuthContext';
import { AuthProvider } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Login from './LoginPage';

function Home({children}) {


const {user,logout}=useContext(AuthContext);

  return (
    <>    
    <div className="App">
      <header className="App-header">
      
      {user && <h1> WELCOME  TO HOME PAGE   {user.username} </h1>}
      {user? ( <button onClick={logout}> Logout </button>):(<Link to={"/login"}> Login </Link>)}
      
      
      </header>
    </div>

    </>

  );
}

export default Home;