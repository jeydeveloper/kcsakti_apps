import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    BookingTime
} from "@components";
import Modal from "react-native-modal";
import styles from "./styles";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markedDates: {},
            checkinTime: "",
            checkoutTime: "",
            keyword: "",
            adult: 1,
            children: 1,
            night: 1,
            modalVisible: false,
            loading: false
        };
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Search"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="times"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <ScrollView style={{ padding: 20, flex: 1 }}>
                    <TextInput
                        style={BaseStyle.textInput}
                        onChangeText={text => this.setState({ keyword: text })}
                        autoCorrect={false}
                        placeholder="What're you looking for ?"
                        placeholderTextColor={BaseColor.grayColor}
                        value={this.state.keyword}
                        selectionColor={BaseColor.primaryColor}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}
