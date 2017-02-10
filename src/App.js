import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';

import LoginForm from './components/LoginForm';

class App extends Component {
    componentDidMount() {
        const config = {
            apiKey: 'AIzaSyBAy4TMNiKorvPuFYgDGZZFA-BYeBHrhKM',
            authDomain: 'fightingworld-48192.firebaseapp.com',
            databaseURL: 'https://fightingworld-48192.firebaseio.com',
            storageBucket: 'fightingworld-48192.appspot.com',
            messagingSenderId: '474202437110'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <LoginForm />
            </Provider>
        );
    }
}

export default App;
