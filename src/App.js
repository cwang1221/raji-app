import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MainLayoutRoute } from './layouts'
import { ProjectsPage, SignInPage, WelcomePage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <MainLayoutRoute exact path="/" component={WelcomePage} />
        <MainLayoutRoute exact path="/projects" component={ProjectsPage} />
        <Route path="/signIn" component={SignInPage} />
        <Route render={() => <h1>404 not found</h1>} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
