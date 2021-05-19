import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { SignInPage, WelcomePage, SignUpPage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/signIn" component={SignInPage} />
        <Route path="/signUp" component={SignUpPage} />
        <Route render={() => <h1>404 not found</h1>} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
