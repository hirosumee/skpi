import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, Icon, Input, ListItem} from 'react-native-elements'
import {connect} from "react-redux";
import {ROOM_LOAD, ROOM_LOADED, ROOM_LOADING} from "../shared/action-types";
import socket from '../socket';
import {MESSAGE_FROM_SERVER} from "../shared/event-types";

const style = StyleSheet.create({
    topBar: {
        height: 50,
        elevation: 10,
    },
    searchInput: {}
});

class Home extends Component {
    loadChannel = () => {
        this.props.onLoadingRoom();
        socket.emit(ROOM_LOAD, {}, (res) => {
            if (!res) {
                return;
            }
            this.props.onLoadRoom(res.rooms);
        })
    };

    componentWillMount(): void {
        this.loadChannel();
        socket.on(MESSAGE_FROM_SERVER, (payload) => {
            console.log(payload);
            let {type, content, sender, room_id, date} = payload;
            for (let room of this.props.chat.rooms) {
                if(room._id === room_id) {
                    room.lastMessage = { content, type };
                    break;
                }
            }
            if(this.props.room.room_id === room_id) {
                this.props.room.push({type, content, sender, room_id, date});
            }
        })
    }

    moveToChatView = (id) => {
        console.log(id)
        return () => {
            this.props.navigation.navigate('Chat', {id});
        }
    };

    render() {
        let {chat} = this.props;
        let {rooms} = chat;
        console.log(rooms, '/')
        return (
            <View>
                <View style={style.topBar}>
                    <Input
                        placeholder='search ...'
                        inputStyle={style.searchInput}
                        rightIcon={{type: 'font-awesome', name: 'search'}}
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />
                </View>
                <View>
                    {
                        rooms.map((l, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}}
                                title={l.members.join(' ')}
                                // subtitle={l.subtitle}
                                onPress={this.moveToChatView(l._id)}
                            />
                        ))
                    }
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        chat: state.chat,
        room: state.room
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLoadingRoom: () => {
            dispatch({
                type: ROOM_LOADING
            })
        },
        onLoadRoom: (rooms) => {
            dispatch({
                type: ROOM_LOADED,
                payload: rooms
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);