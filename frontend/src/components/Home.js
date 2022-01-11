import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from './SignIn'
import SignUp from './SignUp'
import Profile from './Profile'
import { useLoggedInUser } from "../../redux/user/selectors";



export default function Home() {
    const user = useLoggedInUser();

    return (
        <Router>
            <Routes>
                <Route path="/" element={user.isLoggedIn ? <Profile /> : <Navigate to='/signin' />}  />
                <Route exact path="/signin" element={user.isLoggedIn ? <Navigate to='/' /> : <SignIn />}  />
                <Route exact path="/signup" element={user.isLoggedIn ? <Navigate to='/' /> : <SignUp />}  />
            </Routes>

        </Router>
    )
}
