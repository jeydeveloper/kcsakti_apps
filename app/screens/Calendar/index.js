import React, { Component } from "react";
import { View, RefreshControl, FlatList, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, BookingHistory, ListThumbCircle } from "@components";
import { BookingHistoryData } from "@data";
import { Calendar } from "react-native-calendars";

// Load sample data
import { EventListData } from "@data";

export default class MyCalendar extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            loading: false,
            refreshing: false,
            bookingHistory: BookingHistoryData,
            currentDate: '',
            notification: EventListData
        };
    }

    componentDidMount() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        if (month < 10) month = '0' + month;

        this.setState({
            currentDate: (year + '-' + month + '-' + date)
        });
    }

    popupEvent(date) {
        alert(date.dateString);
    }

    render() {
        const { navigation } = this.props;
        const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
        const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
        const workout = { key: 'workout', color: 'green' };
        let { notification } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header title="Calendar" />
                <Calendar
                    markedDates={{
                        [this.state.currentDate]: { selected: true, selectedColor: 'blue' },
                        '2020-02-07': { dots: [vacation, massage, workout] },
                        '2020-02-12': { dots: [vacation] },
                        '2020-02-27': { dots: [vacation, workout] },
                        '2020-03-01': { dots: [vacation, massage] },
                    }}
                    markingType={'multi-dot'}
                    onDayPress={(day) => this.popupEvent(day)}
                />
                
                <ScrollView>
                    <View>
                        <FlatList
                            data={notification}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <ListThumbCircle
                                    txtLeftTitle={item.title}
                                    txtContent={item.location}
                                    txtRight={item.time}
                                />
                            )}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
