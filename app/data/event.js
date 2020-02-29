import { Images } from "@config";
import { UserData } from "@data";

const EventListData = [
    {
        id: "0",
        image: Images.event1,
        title: "Event 1",
        subtitle: "Spirit Of Rock",
        location: "Jakarta",
        tracking: "3km",
        rate: 4.5,
        status: "Sold Out",
        price: "$900",
        priceSale: "$700",
        eventType: "Music",
        time: "7 Feb 2020",
        user: UserData,
        numTicket: 400,
        liked: true
    },
    {
        id: "1",
        image: Images.event2,
        title: "Event 2",
        subtitle: "Spirit Of Rock",
        location: "Bandung",
        tracking: "3km",
        rate: 4.5,
        status: "Sold Out",
        price: "$700",
        priceSale: "$599",
        eventType: "Shows",
        time: "12 Feb 2020",
        user: UserData,
        numTicket: 400,
        liked: true
    },
    {
        id: "2",
        image: Images.event3,
        title: "Event 3",
        subtitle: "Spirit Of Rock",
        location: "Surabaya",
        tracking: "3km",
        rate: 4.5,
        status: "Sold Out",
        price: "$700",
        priceSale: "$599",
        eventType: "Sience",
        time: "27 Feb 2020",
        user: UserData,
        numTicket: 400,
        liked: true
    },
    {
        id: "3",
        image: Images.event4,
        title: "Event 4",
        subtitle: "Spirit Of Rock",
        location: "Bali",
        tracking: "3km",
        rate: 4.5,
        status: "Sold Out",
        price: "$700",
        priceSale: "$599",
        eventType: "Sience",
        time: "1 Mar 2020",
        user: UserData,
        numTicket: 400,
        liked: false
    }
];

export { EventListData };
