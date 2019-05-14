import React from 'react';
import { createDrawerNavigator } from "react-navigation";

import Routes from "./Routes";
import SideBar from "./SideBar";

export const Drawer = createDrawerNavigator(
    Routes,
    {
        drawerBackgroundColor: 'transparent',
        contentComponent: props => <SideBar {...props} />
    }
);
