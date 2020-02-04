import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text, Button, SafeAreaView, Header, Icon } from "@components";
import styles from "./styles";
import { Images, BaseStyle, BaseColor } from "@config";
import { WebView } from 'react-native-webview';

export default class OverViewCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    showSpinner() {
        this.setState({ loading: true });
    }

    hideSpinner() {
        this.setState({ loading: false });
    }

    render() {
        const { navigation } = this.props;
        let { loading } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title=""
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <View
                    style={this.state.loading === true ? customStyle.stylOld : customStyle.styleNew}>
                    <WebView
                        // source={{ uri: 'https://lxp.kcsakti.com/api/upload_content/html5sample/index.html' }}
                        source={{ uri: 'http://www.netpolitanteam.com/home' }}
                        // source={{ uri: 'https://sociolla.com' }}
                        onLoadStart={() => this.showSpinner()}
                        onLoad={() => this.hideSpinner()}
                    />

                    {this.state.loading ? (
                        <ActivityIndicator
                            color="#009688"
                            size="large"
                            style={customStyle.ActivityIndicatorStyle}
                        />
                    ) : null}
                </View>
            </SafeAreaView>
        );
    }
}

const customStyle = StyleSheet.create({
    stylOld: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleNew: {
        flex: 1,
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
});