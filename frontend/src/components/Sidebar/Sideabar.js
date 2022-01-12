import React, {useEffect} from 'react';
import Icon from "awesome-react-icons";

import {Navigation} from 'react-minimal-side-navigation';
import { useNavigate } from "react-router-dom";
import Profile from './../Profile'
import { logoutUser } from "../../../redux/user/operation";
import { useDispatch } from "react-redux";
import { useLoggedInUser} from "../../../redux/user/selectors";
import { Navigate } from "react-router-dom";

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

export default function SideBar({active, children}) {
  const user = useLoggedInUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!user.isLoggedIn) {
    return <Navigate to={'/signin'} />
  }

    return (
      <div style={{display: "flex", flexWrap: "wrap"}}>
        <div style={{width: '300px'}}>
          <div style={{width: '100%', background: "#fff", border: "1px solid #e2e8f0", height: '2000px'}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: '100px', fontSize: "50px", color: "#1f2937"}}>
              Demo App
          </div>
          <Navigation
              // you can use your own router's api to get pathname
              activeItemId={active}
              onSelect={({itemId}) => {
                navigate(itemId)
              }}
              items={[

                {
                  title: 'Channels',
                  itemId: '/create-channel',
                  elemBefore: () => <Icon name="inbox" />,
                  subNav: [
                    {
                      title: 'New Channel',
                      itemId: '/create-channel',
                      // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                      elemBefore: () => <Icon name="bell" />,
                    },
                    {
                      title: 'View Channels',
                      itemId: '/channels',
                      elemBefore: () => <Icon name="bell" />,
                    },
                  ],
                },
                {
                  title: 'Transfers',
                  itemId: '/create-payment',
                  elemBefore: () => <Icon name="inbox" />,
                  subNav: [
                    {
                      title: 'New Transfer',
                      itemId: '/create-payment',
                      elemBefore: () => <Icon name="bell" />,
                    },
                    {
                      title: 'View Transfers',
                      itemId: '/payments',
                      elemBefore: () => <Icon name="bell" />,
                    },
                  ],
                },
                {
                  title: 'Profile',
                  itemId: '/profile',
                  // you can use your own custom Icon component as well
                  // icon is optional
                  elemBefore: () => <Icon name="user" />,
                },
              ]}
            />
            <div style={{padding: "5px", marginTop: "50px"}}>
              <span
                  style={{cursor: "pointer", textTransform: "uppercase"}}
                  onClick={() => {

                    dispatch(logoutUser())
                  }}>
                logout
              </span>
            </div>
          </div>

          </div>
        <div style={{width: "75%"}}>
          {children}
          </div>
      </div>
    );
}
