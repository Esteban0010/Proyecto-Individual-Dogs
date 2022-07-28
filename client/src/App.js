import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './componentes/container/LandingPage.jsx'
import Home from './componentes/container/Home.jsx';
import BreedsCreate from './componentes/container/BreedsCreate';
import { Detail } from './componentes/container/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component ={LandingPage}/>
          <Route path='/home' component = {Home}/>
          <Route path='/dogs' component={BreedsCreate}/>
          <Route path='/home/:id' component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
