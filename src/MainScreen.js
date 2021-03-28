import React,{useState} from 'react'
import UserContext from './context/UserContext';
import HomeScreen from './screens/HomeScreen';
import Footer from './sections/Footer';
import Header from './sections/Header';
import { Redirect, Route, Switch } from "react-router";
import PageNotFoundScreen from './screens/PageNotFoundScreen';
import AdsScreen from './screens/AdsScreen';
import SingleAddMenu from './screens/SingleAddMenu';
import Checkout from './screens/postAd/Checkout';
import LoginRegister from './screens/auth/LoginRegister';
import CheckoutEdit from './screens/editPostedAd/CheckoutEdit';
import ContactScreen from './screens/ContactScreen';
import NotificationScreen from './screens/NotificationScreen';
import ChatScreen from './screens/ChatScreen';

function MainScreen() {

    return (
        <UserContext.Consumer>
        {(UserContext) => (
        <div>

            <Switch>
              <Route path="/menu" component={AdsScreen} />
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/notFound" component={PageNotFoundScreen} />
              <Route exact path="/advertisements/:id" render={(props) => {return <SingleAddMenu {...props} />;}}/>
              <Route exact path="/notifications" component={NotificationScreen} />
              <Route exact path="/login" component={LoginRegister} />
              <Route exact path="/postAdvertisement" component={Checkout} />
              <Route exact path="/edit/:id" render={(props) => { return <CheckoutEdit {...props} />; }}/>
              <Route exact path="/contact" component={ContactScreen} />
              <Route exact path="/chat/:userChatID" component={ChatScreen} />
              <Route exact path="/chat" component={ChatScreen} />

              {/* <Route exact path="/user" render={() => (<CreateUser {...this.props} user={UserContext.userData.user}/>)}/>
              <Route exact path="/advertisements" component={AdsScreen} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
                <Route exact path="/postAdvertisement" component={Checkout} />
        
              <Route exact path="/admin/advertisements/" render={(props) => { if (UserContext.userData.user && UserContext.userData.user.type === "admin") {console.log(UserContext.userData); return <AdminAdsComponent {...props} />; } else {return (<Redirect to="/advertisements?search=&page=1&size=15" />);}}}/>
              <Route exact path="/profile"render={(props) => {if (UserContext.userData.user) {return <Profile {...props} />;} else {return (<Redirect to="/login" />);}}}/>

              <Route exact path="/edit/:id" render={(props) => { return <CheckoutEdit {...props} />; }}/>
              <Route exact path="/test" render={(props) => { return <Test {...props} />;}}/>
              <Route exact path="/admin" render={(props) => { return <Paperbase {...props} />;}}/>
              <Route exact path="/admin/advertisements/:id" render={(props) => { return <AdminSingleAd {...props} />; }}/>
              <Route exact path="/contact" render={(props) => {return <ContactDirectory {...props} />;}}/> */}

{/* 
              <DataProvider> <Route exact path="/profile-edit/step-1" component={Step1} />
                <Route exact path="/profile-edit/step-2" component={Step2} />
                <Route exact path="/profile-edit/results" component={Result} /></DataProvider> */}
              <Redirect to="/notFound" />
            </Switch>
           
        </div>
                )}
    </UserContext.Consumer>
    )
}

export default MainScreen
