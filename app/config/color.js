/**
 * Color Palette Define
 */

let OrangeColor = {
    primaryColor: "#0262B8",
    darkPrimaryColor: "#C31C0D",
    lightPrimaryColor: "#0783ef",
    accentColor: "#4A90A4"
};

let BlueColor = {
    primaryColor: "#5DADE2",
    darkPrimaryColor: "#1281ac",
    lightPrimaryColor: "#68c9ef",
    accentColor: "#0783ef"
};

let PinkColor = {
    primaryColor: "#A569BD",
    darkPrimaryColor: "#C2185B",
    lightPrimaryColor: "#F8BBD0",
    accentColor: "#8BC34A"
};

let GreenColor = {
    primaryColor: "#58D68D",
    darkPrimaryColor: "#388E3C",
    lightPrimaryColor: "#C8E6C9",
    accentColor: "#607D8B"
};

let YellowColor = {
    primaryColor: "#FDC60A",
    darkPrimaryColor: "#FFA000",
    lightPrimaryColor: "#FFECB3",
    accentColor: "#795548"
};

/**
 * Main color use for whole application
 */
let BaseColor = {
    ...OrangeColor,
    ...{
        textPrimaryColor: "#212121",
        textSecondaryColor: "#E0E0E1",
        grayColor: "#9B9B9B",
        darkBlueColor: "#24253D",
        dividerColor: "#BDBDBD",
        whiteColor: "#FFFFFF",
        fieldColor: "#F5F5F5",
        yellowColor: "#FDC60A",
        navyBlue: "#3C5A99",
        kashmir: "#5D6D7E"
    }
};

export {
    BaseColor,
    OrangeColor,
    BlueColor,
    PinkColor,
    GreenColor,
    YellowColor
};
