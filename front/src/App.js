import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useFetch from './useFetch';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import LoginSuccess from './Pages/LoginSuccess';
import LoginFailure from './Pages/LoginFailure';
import Profile from './Pages/Profile';
import Post from './Pages/Post';
import User from './Pages/User';
import Favorites from './Pages/Favorites';
import io from 'socket.io-client';
import SideFavorites from './Components/SideFavorites';
import SidePopular from './Components/SidePopular';

import { Container, Row, Col } from 'react-bootstrap';

function App() {

  const { data: userData, setData: setUserData, isPending: isPendingUser, error: errorUser } = useFetch('http://localhost:8000/api/v1/user');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(!!(userData && userData.user));
  }, [userData])

  useEffect(() => {
    if(!authenticated) {
      setUserData(null);
    }    
  }, [authenticated, setUserData]);

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if(!socket) {
      setSocket(io('http://localhost:8000/', { withCredentials: true }));
    }
  }, []);

  return (
    <Router>
      <div className="App pt-4">
        <header>
          <Navbar 
            setAuthenticated={setAuthenticated}
            authenticated={authenticated} 
            userData={userData}
            isPendingUser={isPendingUser}
            errorUser={errorUser}
          />
        </header>
        <main>
          <Switch>
            <Route exact path={['/', '/profile', '/user/:id','/post/:id', '/favorites']}>
              <Container>
                <Row className="px-4 my-5">
                  <Col xl={2}>
                    <SidePopular 
                      authenticated={authenticated} 
                      userData={userData}
                      isPendingUser={isPendingUser}
                      errorUser={errorUser}
                    />
                  </Col>
                  <Route exact path={['/', '/profile', '/user/:id','/post/:id']}>
                    <Col xl={7}>
                      <Route exact path='/'>
                        <Home 
                          authenticated={authenticated} 
                          userData={userData}
                          isPendingUser={isPendingUser}
                          errorUser={errorUser}
                        />
                      </Route>
                      <Route exact path='/profile'>
                        <Profile 
                          authenticated={authenticated} 
                          userData={userData}
                          isPendingUser={isPendingUser}
                          errorUser={errorUser}
                        />
                      </Route>
                      
                      <Route exact path='/user/:id' render={(props) => (
                        <User
                          key={props.match.params.id}
                          authenticated={authenticated} 
                          userData={userData}
                          isPendingUser={isPendingUser}
                          errorUser={errorUser}
                        />
                      )}>
                      </Route>
                      <Route exact path='/post/:id' render={(props) => (
                        <Post 
                          key={props.match.params.id}
                          authenticated={authenticated} 
                          userData={userData}
                          isPendingUser={isPendingUser}
                          errorUser={errorUser}
                          socket={socket}
                        />
                      )}>
                      </Route>
                    </Col>
                    <Col lg={3}>
                      <SideFavorites 
                        authenticated={authenticated} 
                        userData={userData}
                        isPendingUser={isPendingUser}
                        errorUser={errorUser}
                      />
                    </Col>
                  </Route>
                  <Route exact path={['/favorites']}>
                    <Col lg = {8}>
                      <Route exact path='/favorites'>
                        <Favorites 
                          authenticated={authenticated} 
                          userData={userData}
                          isPendingUser={isPendingUser}
                          errorUser={errorUser}
                        />
                      </Route>
                    </Col>
                  </Route>
                  

                </Row>
              </Container>
            </Route>
            <Route path={['/login', '/login/success', '/login/failure']}>
              <Container>
                <Row className="px-4 my-5 justify-content-md-center">
                  <Col md="auto">
                  <Route exact path='/login'>
                      <Login 
                        authenticated={authenticated} 
                        userData={userData}
                        isPendingUser={isPendingUser}
                        errorUser={errorUser}
                      />
                    </Route>
                    <Route exact path='/login/success'>
                      <LoginSuccess 
                        authenticated={authenticated} 
                        userData={userData}
                        isPendingUser={isPendingUser}
                        errorUser={errorUser}
                      />
                    </Route>
                    <Route exact path='/login/failure'>
                      <LoginFailure 
                        authenticated={authenticated} 
                        userData={userData}
                        isPendingUser={isPendingUser}
                        errorUser={errorUser}
                      />
                    </Route>
                  </Col>
                </Row>
              </Container>
            </Route>
            <Route path={['*']}>
              <Container>
                <Row className="px-4 my-5">
                  <Col sm={12}>
                    <Route path='*'>
                      <NotFound 
                        authenticated={authenticated} 
                        userData={userData}
                        isPendingUser={isPendingUser}
                        errorUser={errorUser}
                      />
                    </Route>
                  </Col>
                </Row>
              </Container>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
