import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";
import { TabView, TabBar } from "react-native-tab-view";
import { BaseStyle, BaseColor, BaseSetting, Images } from "@config";
import * as Utils from "@utils";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    ProfileDetail,
    ProfilePerformance,
    PostListItem
} from "@components";
import styles from "./styles";

// Load sample data
import { UserData } from "@data";

class Profile extends Component {
    constructor(props) {
        super();
        this.state = {
            reminders: false,
            loading: false,
            userData: UserData[0],
            index: 0,
            routes: [
                { key: "history", title: "History" },
                { key: "recent", title: "Recent" },
                { key: "certificate", title: "Certificate" }
            ]
        };
    }

    /**
     * @description Simple logout with Redux
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onLogOut() {
        this.setState(
            {
                loading: true
            },
            () => {
                this.props.actions.authentication(false, response => {
                    if (response.success) {
                        this.props.navigation.navigate("Loading");
                    } else {
                        this.setState({ loading: false });
                    }
                });
            }
        );
    }

    /**
     * @description Call when reminder option switch on/off
     */
    toggleSwitch = value => {
        this.setState({ reminders: value });
    };

    _handleIndexChange = index =>
        this.setState({
            index
        });

    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            tabStyle={styles.tab}
            inactiveColor={BaseColor.grayColor}
            activeColor={BaseColor.textPrimaryColor}
            renderLabel={({ route, focused, color }) => (
                <View
                    style={{
                        flex: 1,
                        width: Utils.getWidthDevice() / 3,
                        alignItems: "center"
                    }}
                >
                    <Text headline semibold={focused} style={{ color }}>
                        {route.title}
                    </Text>
                </View>
            )}
        />
    );

    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case "history":
                return (
                    <HistoryTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "recent":
                return (
                    <RecentTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "certificate":
                return (
                    <CertificateTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
        }
    };

    render() {
        const { navigation } = this.props;
        const { userData, loading } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Profile"
                    renderRight={() => {
                        return (
                            <Icon
                                name="bell"
                                size={24}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressRight={() => {
                        navigation.navigate("Notification");
                    }}
                />
                <ScrollView>
                    <View style={styles.contain}>
                        <ProfileDetail
                            image={userData.image}
                            textFirst={userData.name}
                            textSecond={userData.address}
                            icon={false}
                        />
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                style={styles.profileItem}
                                onPress={() => {
                                    navigation.navigate("ProfileEdit");
                                }}
                            >
                                <Text body1>Edit Profile</Text>
                                <Icon
                                    name="angle-right"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.profileItem}
                                onPress={() => {
                                    navigation.navigate("ChangePassword");
                                }}
                            >
                                <Text body1>Change Password</Text>
                                <Icon
                                    name="angle-right"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TabView
                        lazy
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderTabBar={this._renderTabBar}
                        onIndexChange={this._handleIndexChange}
                    />
                </ScrollView>
                <View style={{ padding: 20 }}>
                    <Button
                        full
                        loading={loading}
                        onPress={() => this.onLogOut()}
                    >
                        Sign Out
                    </Button>
                </View>
            </SafeAreaView>
        );
    }
}

class HistoryTab extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <View style={{
                marginTop: 20
            }}>
            <PostListItem
                title="See The Unmatched"
                description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
                style={{ marginTop: 10, width: '100%', paddingHorizontal: 20 }}
                image={Images.trip9}
                onPress={() => {
                    navigation.navigate("Post");
                }}
            />
            <PostListItem
                description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
                title="Top 15 Things Must To Do"
                style={{ marginTop: 10, width: '100%', paddingHorizontal: 20 }}
                image={Images.trip8}
                onPress={() => {
                    navigation.navigate("Post");
                }}
            />
        </View>
        );
    }
}

class RecentTab extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <View style={{
                marginTop: 20
            }}>
            <PostListItem
                title="See The Unmatched"
                description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
                style={{ marginTop: 10, width: '100%', paddingHorizontal: 20 }}
                image={Images.trip9}
                onPress={() => {
                    navigation.navigate("Post");
                }}
            />
            <PostListItem
                description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
                title="Top 15 Things Must To Do"
                style={{ marginTop: 10, width: '100%', paddingHorizontal: 20 }}
                image={Images.trip8}
                onPress={() => {
                    navigation.navigate("Post");
                }}
            />
        </View>
        );
    }
}

class CertificateTab extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <View style={{
                marginTop: 20
            }}>
            <PostListItem
                title="See The Unmatched"
                description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
                style={{ marginTop: 10, width: '100%', paddingHorizontal: 20 }}
                image={Images.trip9}
                onPress={() => {
                    navigation.navigate("Post");
                }}
            />
            <PostListItem
                description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
                title="Top 15 Things Must To Do"
                style={{ marginTop: 10, width: '100%', paddingHorizontal: 20 }}
                image={Images.trip8}
                onPress={() => {
                    navigation.navigate("Post");
                }}
            />
        </View>
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
)(Profile);
