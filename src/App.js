import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MainLayout } from './layouts'
import { SignInPage, WelcomePage } from './pages'

function App() {
  return (
    <MainLayout>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/signIn" component={SignInPage} />
          <Route render={() => <h1>404 not found</h1>} />
        </Switch>
      </BrowserRouter>
    </MainLayout>
  )
}

export default App
