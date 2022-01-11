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
                {/*<ProtectedRoute path="/" element={<Profile />} />*/}
                {/*<Route path="/" element={<SignIn />} />*/}
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/profilex" element={<Profile />} />
            </Routes>

        </Router>
    )
}
