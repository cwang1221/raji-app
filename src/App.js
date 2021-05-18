import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LoginPage, WelcomePage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/login" component={LoginPage} />
        <Route render={() => <h1>404 not found</h1>} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
