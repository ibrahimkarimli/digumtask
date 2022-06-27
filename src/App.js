import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Home from './pages/home/home';
import New from './pages/new/new';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/new">
          <New />
        </Route>
      </Router>
    </div>
  );
}

export default App;
