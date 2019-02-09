import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat'
import {connect} from "react-redux";
import socket from "../socket";
import {LOAD_MESSAGE, MESSAGE_TO_SERVER} from "../shared/event-types";

class Chat extends Component {
    state = {
        messages: [],
    };
    loadMessage = () => {
        let {_id} = this.roomInfo;
        socket.emit(LOAD_MESSAGE, {id: _id}, function (res) {
            console.log(res);
        })
    };

    componentWillMount() {
        // this.setState({
        //     messages: [
        //         {
        //             _id: 1,
        //             text: 'Hello developer',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'React Native',
        //                 avatar: 'https://placeimg.com/140/140/any',
        //             },
        //         },
        //     ],
        // });

        const {navigation, chat} = this.props;
        const id = navigation.getParam('id');
        let [roomInfo] = chat.rooms.filter(room => room._id === id);
        if (!roomInfo) {
            navigation.navigate('Home');
        }
        this.roomInfo = roomInfo;
        this.loadMessage();
    }

    onSend(messages = []) {
        // this.setState(previousState => ({
        //     messages: GiftedChat.append(previousState.messages, messages),
        // }))
        let {_id} = this.roomInfo;
        let [first] = messages;
        socket.emit(MESSAGE_TO_SERVER, {room_id: _id, content: first.text, type: 'text'})
    }

    render() {
        let {username, room } = this.props;
        console.log(room)
        return (
            <GiftedChat
                messages={room.messages.map(message => {
                    message.text = message.content;
                    message.createdAt =  new Date();
                    message.user = {
                        username: message.username
                    }
                })}
                onSend={messages => this.onSend(messages)}
                isAnimated={true}
                user={username}
                placeholder="Gõ đi em êiii ..."
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        chat: state.chat,
        username: state.common.username,
        room: state.room
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);