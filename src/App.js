import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import NewQuote from './containers/NewQuote/NewQuote';
import EditQuote from './containers/EditQuote/EditQuote';

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={MainPage}/>
      <Route path='/add-quote' component={NewQuote}/>
      <Route path='/edit/:id' component={EditQuote}/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
