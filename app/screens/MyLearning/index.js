import React, { Component } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, BookingHistory, PostListItem } from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import styles from "./styles";
import * as Utils from "@utils";
import { BookingHistoryData } from "@data";

export default class MyLearning extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            index: 0,
            routes: [
                { key: "myAssignment", title: "My Assignment" },
                { key: "continueLearning", title: "Continue Learning" }
            ]
        };
    }

    // When tab is activated, set what's index value
    _handleIndexChange = index =>
        this.setState({
            index
        });

    // Customize UI tab bar
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
                        width: Utils.getWidthDevice() / 2,
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

    // Render correct screen container when tab is activated
    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case "myAssignment":
                return (
                    <MyAssignmentTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "continueLearning":
                return (
                    <ContinueLearningTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
        }
    };

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="My Learning"
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
                <TabView
                    lazy
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                />
            </SafeAreaView>
        );
    }
}

class MyAssignmentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            bookingHistory: BookingHistoryData
        };
    }

    renderItem(item) {
        return (
            <BookingHistory
                name={item.name}
                checkIn={item.checkIn}
                checkOut={item.checkOut}
                total={item.total}
                price={item.price}
                style={{ paddingVertical: 10, marginHorizontal: 20 }}
                onPress={() => {
                    this.props.navigation.navigate("PostDetail");
                }}
            />
        );
    }

    render() {
        let { refreshing, bookingHistory } = this.state;
        return (
            <FlatList
                refreshControl={
                    <RefreshControl
                        colors={[BaseColor.primaryColor]}
                        tintColor={BaseColor.primaryColor}
                        refreshing={refreshing}
                        onRefresh={() => { }}
                    />
                }
                data={bookingHistory}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => this.renderItem(item)}
            />
        );
    }
}

class ContinueLearningTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            bookingHistory: BookingHistoryData
        };
    }

    renderItem() {
        const { navigation } = this.props;
        return (
            <PostListItem
                title="See The Unmatched"
                description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
                style={{ marginTop: 10, width: '100%', paddingHorizontal: 20 }}
                image={Images.trip9}
                onPress={() => {
                    navigation.navigate("PostDetail");
                }}
            />
        );
    }

    render() {
        let { refreshing, bookingHistory } = this.state;
        return (
            <FlatList
                refreshControl={
                    <RefreshControl
                        colors={[BaseColor.primaryColor]}
                        tintColor={BaseColor.primaryColor}
                        refreshing={refreshing}
                        onRefresh={() => { }}
                    />
                }
                data={bookingHistory}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => this.renderItem(item)}
            />
        );
    }
}
