import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import User from '../components/user';
import GetAllUsers from '../components/getAllUsers';
import Home from '../components/home';
import Company from '../components/company';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from 'react-router';
import Root from '../components/root';
import Invoice from '../components/invoice';

const store = configureStore();

class App extends React.Component{

  render() {
    return (
      <div>
        <Provider store={store}>
          {/*<div>*/}
            {/*<Home/>*/}
            {/*<User/>*/}
          {/*</div>*/}
          <Router history={browserHistory}>
            <Route path="/" component={Root}>
              <IndexRoute component={Home}/>
              <Route path="user" component={User}/>
              <Route path="getAllUsers" component={GetAllUsers}/>
              <Route path="home" component={Home}/>
            </Route>
          </Router>
        </Provider>
      </div>
    );
  }
};

export default App;