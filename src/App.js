import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import jwt_decode from 'jwt-decode';
import { currentUserVar } from './apollo/cache';
import Header from './components/header/header.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import Buyers from './pages/buyers/buyers.component';
import Suppliers from './pages/suppliers/suppliers.component';
import Home from './pages/homepage/homepage.component';
import SingleSupplierPage from './pages/single-supplier/single-supplier.component';
import SignUpAndSignInPage from './pages/sign-up-and-sign-in/sign-up-and-sign-in.component';
import GET_CURRENT_USER from './apollo/queries';
import Authenticated from './components/authenticated/authenticated.component';
import ProductPage from './pages/product-page/product-page.component';
import NotificationPage from './pages/notification-page/notification-page.component';

function App() {
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      var decoded = jwt_decode(token);

      currentUserVar({
        ...currentUserVar(),
        id: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        phoneNumber: decoded.phoneNumber,
        loggedIn: true,
      });
    }
  }, []);
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  if (loading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/products">
          {' '}
          <Authenticated Component={ProductPage} />
        </Route>
        <Route
          exact
          path="/suppliers">
             <Authenticated Component={Suppliers} />
        </Route>
        <Route exact path="/buyer">
          {' '}
          <Authenticated Component={Buyers} />
        </Route>
        <Route exact path="/signup">
          {data.currentuser.loggedIn ? (
            <Redirect to="/" />
          ) : (
            <SignUpAndSignInPage />
          )}
        </Route>
        <Route exact path="/describe">
          <SingleSupplierPage />
        </Route>
        <Route
          exact
          path="/notification"
         >
            <Authenticated Component={NotificationPage} />
          
        </Route>
      </Switch>
    </div>
  );
}

export default App;
