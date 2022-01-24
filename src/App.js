import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';

import routes from './config/routes';
function App() {
  return (
    <Fragment>
      <ToastProvider>
      </ToastProvider>
      <Router>
        <Switch>
          {routes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ) : (null);
          })}
        </Switch>
      </Router>
    </Fragment>

  );
}

export default App;
