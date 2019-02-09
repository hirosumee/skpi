import {
    createStackNavigator,
    createAppContainer
} from "react-navigation";
import Login from "./components/Login";
import Home from "./components/Home";
import Chat from "./components/Chat";

const AppNavigator = createStackNavigator({
    Login,
    Home: {screen: Home, navigationOptions: {header: null}},
    Chat: {screen: Chat, navigationOptions: {header: null}}
}, {
    initialRouteName: "Login"
});
export default createAppContainer(AppNavigator);