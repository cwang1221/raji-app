import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { MainLayoutRoute } from './layouts'
import { MilestonesPage, NotFoundPage, ProjectsPage, SignInPage, TestPage, WelcomePage } from './pages'
import './App.less'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <MainLayoutRoute path="/home" component={WelcomePage} />
        <MainLayoutRoute path="/projects" component={ProjectsPage} />
        <MainLayoutRoute path="/milestones" component={MilestonesPage} />
        <Route path="/signIn" component={SignInPage} />
        <Route path="/test" component={TestPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
