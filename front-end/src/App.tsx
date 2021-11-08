// import { UserContext } from './contexts/User';
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import routes from './config/routes';
import logging from './config/logging';
import UserContext from './contexts/UserContext';
import IUser from './interfaces/user';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    username: '',
    avatarURL: '',
    name: '',
    topics: [],
    media: [],
    saved: [],
  });

  useEffect(() => {
    logging.info('Loading app...');
    const loggedInUserContext: string | null = localStorage.getItem('loggedInUser');
    if (loggedInUserContext) {
      const userObj = JSON.parse(loggedInUserContext);
      setUser(userObj.username);
    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(props: RouteComponentProps<any>) => (
                    <route.component name={route.name} {...props} {...route.props} />
                  )}
                />
              );
            })}
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
