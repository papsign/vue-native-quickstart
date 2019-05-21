import { createDrawerNavigator, createStackNavigator , createAppContainer } from "react-navigation";
import { SideBar , DrawerRoutes , NavigationRoutes } from "./Routes";
import React from 'react';

const Drawer = createDrawerNavigator(
  DrawerRoutes,
  {
    drawerBackgroundColor: 'transparent',
    contentComponent: props => <SideBar {...props} />
  }
);
NavigationRoutes.Drawer = Drawer


const Navigator = createStackNavigator(
  NavigationRoutes,
  {
    initialRouteName: 'Drawer',
    headerMode: "none"
  }
);

export const AppNavigation = createAppContainer(Navigator);
