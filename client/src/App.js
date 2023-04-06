import './App.css';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/signUp">
          <SignUpForm />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
      <ToastContainer />



    </div>
  );
}

export default App;
