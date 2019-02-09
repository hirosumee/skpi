import React, {Component} from 'react';
import AppNavigator from "./AppNavigator";
import {connect} from "react-redux";


class Entry extends Component {

    render() {
        return (
            <AppNavigator/>
        );
    }
}


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
   return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry);