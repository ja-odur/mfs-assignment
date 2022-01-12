import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from './SignIn'
import SignUp from './SignUp'
import Profile from './Profile'
import CreateChannel from "./CreateChannel";
import ViewChannels from "./ViewChannels";
import CreatePayment from "./CreatePayment";
import ViewPayments from "./ViewPayments";
import TransitionAlerts from "./TransitionAlert";
import { useLoggedInUser } from "../../redux/user/selectors";



export default function Home() {
    const user = useLoggedInUser();

    return (
        <Router>
            <TransitionAlerts />
            <Routes>
                <Route path="/" element={user.isLoggedIn ? <ViewChannels /> : <Navigate to='/signin' />}  />
                <Route path="/create-channel" element={user.isLoggedIn ? <CreateChannel /> : <Navigate to='/signin' />}  />
                <Route path="/channels" element={user.isLoggedIn ? <ViewChannels /> : <Navigate to='/signin' />}  />
                <Route path="/create-payment" element={user.isLoggedIn ? <CreatePayment /> : <Navigate to='/signin' />}  />
                <Route path="/payments" element={user.isLoggedIn ? <ViewPayments /> : <Navigate to='/signin' />}  />
                <Route exact path="/signin" element={user.isLoggedIn ? <Navigate to='/' /> : <SignIn />}  />
                <Route exact path="/signup" element={user.isLoggedIn ? <Navigate to='/' /> : <SignUp />}  />
                <Route path="/profile" element={user.isLoggedIn ? <Profile /> : <Navigate to='/signin' />}  />
            </Routes>

        </Router>
    )
}
