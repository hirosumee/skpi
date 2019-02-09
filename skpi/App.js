/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Provider} from "react-redux";
import store from "./App/store";

import Entry from "./App/entry";
type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <Entry/>
            </Provider>
        );
    }
}