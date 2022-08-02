import './App.css';
import s from './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './componentes/container/LandingPage.jsx'
import Home from './componentes/container/Home.jsx';
import BreedsCreate from './componentes/container/BreedsCreate';
import Detail from './componentes/container/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className={s.black}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/home' component={Home} />
            <Route path='/dogs' component={BreedsCreate} />
            <Route exact path='/home/:id' component={Detail} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
