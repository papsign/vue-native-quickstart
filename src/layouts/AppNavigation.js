import { createStackNavigator , createAppContainer } from "react-navigation";
import { Drawer } from "./Drawer";
import Routes from "./Routes";

Routes.Drawer = Drawer;
const Navigator = createStackNavigator(
  Routes,
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export const AppNavigation = createAppContainer(Navigator);
