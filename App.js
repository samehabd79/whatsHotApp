import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './screens/Login.js';
import Discussions from './screens/Discussions';
import DiscussionDetails from './screens/DiscussionDetails';
import AddNew from './screens/AddNew';

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Discussions" component={Discussions} />
      <Stack.Screen name="DiscussionDetails" component={DiscussionDetails} />
      <Stack.Screen name="AddNew" component={AddNew} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
