import React from 'react';
import Icon from "awesome-react-icons";

import {Navigation} from 'react-minimal-side-navigation';

import Profile from './../Profile'

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {Route, Routes, useNavigate} from "react-router-dom";

export default function SideBar({active, children}) {
  const navigate = useNavigate();

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
                  itemId: '/channels',
                  elemBefore: () => <Icon name="inbox" />,
                  subNav: [
                    {
                      title: 'New Channel',
                      itemId: '/management/projects',
                      // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                      elemBefore: () => <Icon name="bell" />,
                    },
                    {
                      title: 'View Channels',
                      itemId: '/management/members',
                      elemBefore: () => <Icon name="bell" />,
                    },
                  ],
                },
                {
                  title: 'Payments',
                  itemId: '/payments',
                  elemBefore: () => <Icon name="inbox" />,
                  subNav: [
                    {
                      title: 'New Payment',
                      itemId: '/management/teams',
                      elemBefore: () => <Icon name="bell" />,
                    },
                    {
                      title: 'View Payments',
                      itemId: '/management/teams',
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
          </div>

          </div>
        <div style={{width: "75%"}}>
          {children}
          </div>
      </div>
    );
}
