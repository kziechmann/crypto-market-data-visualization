import 'babel-polyfill'
import React from 'react';
import HomePage from './views/pages/HomePage'
import { Provider } from 'react-redux'
import appStore from './data/redux/appStore'
import './App.css';

const store = appStore;

function App() {

  return (
    <Provider store={store}>
      <div className="App">
          <HomePage/>
      </div>
    </Provider>
  );
}

export default App;
