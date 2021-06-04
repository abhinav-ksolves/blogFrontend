import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoading from './components/PageLoading';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import YourPosts from './components/userPosts';
import EditPost from './components/EditPost';
import ManagePosts from './components/ManagePosts';
import Post from './components/Post';

import Error from './components/Error';
export const UserContext = createContext();

function App() {
  const userLoginLogout = useSelector(state => state.userLoginLogout);
  const { Loading, msg, userInfo } = userLoginLogout;
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    setPageLoading(false);
  }, []);
  return (
    <>
      {

        pageLoading ? <PageLoading /> :
          <UserContext.Provider value={{ Loading, msg, userInfo }}>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/createPost">
                  <CreatePost />
                </Route>
                <Route exact path="/yourPosts">
                  <YourPosts />
                </Route>
                <Route path="/post/edit" component={EditPost} />
                <Route exact path="/post/:postId" component={Post} />


                <Route exact path="/admin/managePosts">
                  <ManagePosts />
                </Route>
                <Route path="*">
                  <Error />
                </Route>
              </Switch>

              <Footer />
            </BrowserRouter>
          </UserContext.Provider>

      }
    </>
  );
}

export default App;
