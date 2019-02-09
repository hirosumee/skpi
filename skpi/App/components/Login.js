import React from 'react';
import {View, Text, StyleSheet, TextInput, AsyncStorage} from "react-native";
import t from 'tcomb-form-native';
import {Button} from "react-native-elements";
import {connect} from 'react-redux';
import {REDIRECT_TO, SESSION_LOADED, SESSION_LOADING} from "../shared/action-types";
import socket from "../socket";
import {INIT_SS_WITH_CRE, INIT_SS_WITH_EX_SSID} from "../shared/event-types";

const Form = t.form.Form;
const User = t.struct({
    username: t.String,
    password: t.String
});
const options = {
    fields: {
        username: {
            error: 'Trường username được yêu cầu'
        },
        password: {
            error: 'Trường mật khẩu được yêu cầu '
        }
    },
};

class Login extends React.Component {
    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
        let pre_username = nextProps.common.username;
        if (pre_username) {
            this.props.navigation.replace('Home');
        }
    }

    async componentDidMount(): void {
        let ssid = await AsyncStorage.getItem('ssid');
        console.log(ssid);
        if (ssid) {
            this.props.onLoading();
            socket.emit(INIT_SS_WITH_EX_SSID, {ssid},  (res)  => {
                let {username} = res;
                console.log(res);
                this.props.onLoaded(username);
            })
        }
        //
    }

    initSession = (username, password) => {
        socket.emit(INIT_SS_WITH_CRE, {username, password}, async (res) => {
            let { username, ssid } = res;
            console.log(res);
            AsyncStorage.setItem('ssid', `${ssid}`);
            this.props.onLoaded(username);
        });
    };

    handleSubmit = () => {
        // do the things
        const value = this._form.getValue(); // use that ref to get the form value
        // let errors = this._form.getError();
        // console.log(errors);
        console.log('value: ', value);
        if (value) {
            this.initSession(value.username, value.password);
        }
    };

    render() {

        return (
            <View style={style.con}>
                <View style={style.login_con}>
                    <Form type={User} ref={c => this._form = c} options={options}/>
                    <Button
                        title="Sign In Now!"
                        onPress={this.handleSubmit}
                        style={style.button}
                        borderRadius={10}
                    />
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    con: {
        flex: 5, alignItems: "center", justifyContent: "center"
    },
    login_con: {
        width: 300,
        justifyContent: 'center',
        padding: 20,
        paddingTop: -50,
        backgroundColor: '#ffffff',
    }
});

function mapStateToProps(state) {
    return {
        common: state.common
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLoading: function () {
            dispatch({type: SESSION_LOADING});
        },
        onLoaded: function (username) {
            dispatch({type: SESSION_LOADED, payload: {username}})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);