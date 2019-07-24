import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home/home.component'
import Login from './pages/Login/login.component'
import SignUp from './pages/SignUp/sign-up.component'

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </React.Fragment>
  );
}

export default App
