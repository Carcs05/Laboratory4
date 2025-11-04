import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BudgetProvider } from './app/context/BudgetContext';
import Landing from './app/screens/Landing';
import BudgetTracker from './app/screens/BudgetTracker';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <BudgetProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="BudgetTracker" component={BudgetTracker} />
        </Stack.Navigator>
      </NavigationContainer>
    </BudgetProvider>
  );
}