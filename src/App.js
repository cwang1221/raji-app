import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { MainLayoutRoute } from './layouts'
import { MilestonesPage, ProjectsPage, SignInPage, WelcomePage } from './pages'
import './App.less'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <MainLayoutRoute path="/dashboard" component={WelcomePage} />
        <MainLayoutRoute path="/projects" component={ProjectsPage} />
        <MainLayoutRoute path="/milestones" component={MilestonesPage} />
        <Route path="/signIn" component={SignInPage} />
        <Route render={() => <h1>404 not found</h1>} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
