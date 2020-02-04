import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "adminlxp@mail.com",
            password: "lxp#2019",
            loading: false,
            success: {
                id: true,
                password: true
            }
        };
    }

    onLogin = async () => {
        const { id, password, success } = this.state;
        const { navigation } = this.props;
        if (id == "" || password == "") {
            this.setState({
                success: {
                    ...success,
                    id: false,
                    password: false
                }
            });
        } else {
            this.setState(
                {
                    loading: true
                },
                () => {
                    // this.props.actions.authentication(true, response => {
                    //     if (
                    //         response.success &&
                    //         id == "test" &&
                    //         password == "123456"
                    //     ) {
                    //         navigation.navigate("Loading");
                    //     } else {
                    //         this.setState({
                    //             loading: false
                    //         });
                    //     }
                    // });
                }
            );
        }

        fetch('https://lxp.kcsakti.com/api/auth/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": id,
                "password": password
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if(res.errors) {
                    Alert.alert("Login Failed", "Error: "+ res.errors.message);
                } else {
                    this.props.actions.authentication(true, response => {
                        if(response.success) {
                            navigation.navigate("Loading");
                        }
                    });
                }
                this.setState({
                    loading: false
                });
            })
            .catch((error) => {
                Alert.alert("Server Error", "Error: "+ error);
            });
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Sign In"
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
                <ScrollView>
                    <View style={styles.contain}>
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 65 }]}
                            onChangeText={text => this.setState({ id: text })}
                            onFocus={() => {
                                this.setState({
                                    success: {
                                        ...this.state.success,
                                        id: true
                                    }
                                });
                            }}
                            autoCorrect={false}
                            placeholder="ID"
                            placeholderTextColor={
                                this.state.success.id
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={this.state.id}
                            selectionColor={BaseColor.primaryColor}
                        />
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text =>
                                this.setState({ password: text })
                            }
                            onFocus={() => {
                                this.setState({
                                    success: {
                                        ...this.state.success,
                                        password: true
                                    }
                                });
                            }}
                            autoCorrect={false}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor={
                                this.state.success.password
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={this.state.password}
                            selectionColor={BaseColor.primaryColor}
                        />
                        <View style={{ width: "100%" }}>
                            <Button
                                full
                                loading={this.state.loading}
                                style={{ marginTop: 20 }}
                                onPress={() => {
                                    this.onLogin();
                                }}
                            >
                                Sign In
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
