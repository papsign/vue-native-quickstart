import Sidebar from "../screens/sidebar.vue";
import Home from "../screens/home.vue";
import Menu from "../screens/menu.vue";
import Infos from "../screens/infos.vue";
import StreamList from "../screens/streamlist.vue";

/*
Define your route in this file
*/
export const SideBar = Sidebar

export const DrawerRoutes = {
    Home: Home,
    Infos: Infos,
    StreamList: StreamList,
}

export const NavigationRoutes = {
    Home: Home,
    Infos: Infos,
    StreamList: StreamList,
    Menu: Menu,
}
