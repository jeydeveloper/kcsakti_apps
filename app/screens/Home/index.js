import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList
} from "react-native";
import {
    Image,
    Text,
    Icon,
    HotelItem,
    Card,
    Button,
    SafeAreaView,
    EventCard,
    ListThumbSquare,
    PostListItem
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";

// Load sample data
import { PromotionData, TourData, HotelData, MessagesData } from "@data";

export default class Home extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            icons: [
                {
                    icon: "gamepad",
                    name: "Interactive",
                    route: "Messenger"
                },
                {
                    icon: "video",
                    name: "Video",
                    route: "Messenger"
                },
                {
                    icon: "book",
                    name: "Book",
                    route: "Messenger"
                },
                {
                    icon: "headphones-alt",
                    name: "Audio",
                    route: "Messenger"
                },
                {
                    icon: "question",
                    name: "Quiz",
                    route: "Messenger"
                }
            ],
            relate: [
                {
                    id: "0",
                    image: Images.event4,
                    title: "BBC Music Introducing",
                    time: "Thu, Oct 31, 9:00am",
                    location: "Tobacco Dock, London"
                },
                {
                    id: "1",
                    image: Images.event5,
                    title: "Bearded Theory Spring Gathering",
                    time: "Thu, Oct 31, 9:00am",
                    location: "Tobacco Dock, London"
                }
            ],
            promotion: PromotionData,
            tours: TourData,
            hotels: HotelData.splice(0, 4),
            heightHeader: Utils.heightHeader(),
            messenger: MessagesData,
            todo: [
                {
                    id: "1",
                    title: "South Travon",
                    image: Images.trip1
                },
                {
                    id: "2",
                    title: "South Travon",
                    image: Images.trip2
                },
                {
                    id: "3",
                    title: "South Travon",
                    image: Images.trip3
                },
                {
                    id: "4",
                    title: "South Travon",
                    image: Images.trip4
                },
                {
                    id: "5",
                    title: "South Travon",
                    image: Images.trip5
                }
            ],
        };
        this._deltaY = new Animated.Value(0);
    }

    /**
     * @description Show icon services on form searching
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @returns
     */
    renderIconService() {
        const { navigation } = this.props;
        const { icons } = this.state;

        return (
            <FlatList
                data={icons}
                numColumns={5}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.itemService}
                            activeOpacity={0.9}
                            onPress={() => {
                                navigation.navigate(item.route);
                            }}
                        >
                            <View style={styles.iconContent}>
                                <Icon
                                    name={item.icon}
                                    size={14}
                                    color={BaseColor.primaryColor}
                                    solid
                                />
                            </View>
                            <Text footnote grayColor>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }

    render() {
        const { navigation } = this.props;
        const { promotion, tours, hotels, relate, heightHeader, messenger, todo } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(70);
        const marginTopBanner = heightImageBanner - heightHeader;
        return (
            <View style={{ flex: 1 }}>
                <Animated.Image
                    source={Images.trip3}
                    style={[
                        styles.imageBackground,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(100),
                                    Utils.scaleWithPixel(100)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    0
                                ]
                            })
                        }
                    ]}
                />
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    <ScrollView
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { y: this._deltaY }
                                }
                            }
                        ])}
                        onContentSizeChange={() =>
                            this.setState({
                                heightHeader: Utils.heightHeader()
                            })
                        }
                        scrollEventThrottle={8}
                    >
                        <View style={{ alignItems: "center" }}>
                            <View
                                style={[
                                    styles.searchForm,
                                    { marginTop: marginTopBanner }
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("Search")
                                    }
                                    activeOpacity={0.9}
                                >
                                    <View style={BaseStyle.textInput}>
                                        <Text body1 grayColor>
                                            What're you looking for ?
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                {this.renderIconService()}
                            </View>
                        </View>
                        {/* Todo Things */}
                        <View style={styles.blockView}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 10,
                                    alignItems: "flex-end"
                                }}
                            >
                                <Text headline semibold>
                                    My Assignment
                                    </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Booking");
                                    }}
                                >
                                    <Text caption1 grayColor>
                                        Show More
                                        </Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={todo}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item }) => (
                                    <PostListItem
                                        style={{ marginRight: 20 }}
                                        title="South Travon"
                                        date="End Date: 29-02-2020"
                                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                        image={item.image}
                                        onPress={() => {
                                            navigation.navigate(
                                                "PostDetail"
                                            );
                                        }}
                                    />
                                )}
                            />
                        </View>
                        {/* Hiking */}
                        <View>
                            <View style={styles.blockViewOther}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                        alignItems: "flex-end"
                                    }}
                                >
                                    <Text headline semibold>
                                        Management User
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Messenger");
                                        }}
                                    >
                                        <Text caption1 grayColor>
                                            Show More
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={tours}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Card
                                        style={[
                                            styles.tourItem,
                                            index == 0
                                                ? { marginHorizontal: 20 }
                                                : { marginRight: 20 }
                                        ]}
                                        image={item.image}
                                        onPress={() =>
                                            navigation.navigate("PostDetail")
                                        }
                                    >
                                        <Text body2 whiteColor semibold>
                                            {item.name}
                                        </Text>
                                    </Card>
                                )}
                            />
                        </View>
                        {/* Hiking */}
                        <View>
                        <View style={styles.blockViewOther}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                        alignItems: "flex-end"
                                    }}
                                >
                                    <Text headline semibold>
                                        Soft Skill
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Messenger");
                                        }}
                                    >
                                        <Text caption1 grayColor>
                                            Show More
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={tours}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Card
                                        style={[
                                            styles.tourItem,
                                            index == 0
                                                ? { marginHorizontal: 20 }
                                                : { marginRight: 20 }
                                        ]}
                                        image={item.image}
                                        onPress={() =>
                                            navigation.navigate("PostDetail")
                                        }
                                    >
                                        <Text body2 whiteColor semibold>
                                            {item.name}
                                        </Text>
                                    </Card>
                                )}
                            />
                        </View>
                        <View style={{
                            marginBottom: 20
                        }}>
                            <View style={styles.contentHiking}>
                                <Text title3 semibold>
                                    Recommendation For You
                                </Text>
                            </View>
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
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}
