import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
//import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import { Provider } from 'react-redux';
import { searchText, post, postForm, NotificationItem, postItem, reminder, remindItem } from './components/states/post-reducers.js';



declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
      
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        
      </SafeAreaProvider>
    );
  }

}
