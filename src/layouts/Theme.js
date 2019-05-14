import { StyleProvider } from "native-base";
import React, { Component } from "react";

import getTheme from "../../native-base-theme/components";
import theme from "../styles/theme";

export default class Theme extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(theme)}>
            {this.props.children}
            </StyleProvider>  
        )
    }
}