import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { MainLayoutRoute } from './layouts'
import { MilestonesPage, NotFoundPage, ProjectsPage, SettingPage, SignInPage, TestPage, WelcomePage } from './pages'
import './App.less'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <MainLayoutRoute path="/home" headerCreateType="story" component={WelcomePage} />
        <MainLayoutRoute path="/projects" headerCreateType="project" component={ProjectsPage} />
        <MainLayoutRoute path="/milestones" headerCreateType="milestone" component={MilestonesPage} />
        <MainLayoutRoute path="/settings" headerCreateType="story" component={SettingPage} />
        <Route path="/signIn" component={SignInPage} />
        <Route path="/test" component={TestPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
