import { View, ViewProps, StyleSheet } from "react-native";

export default function (props: ViewProps) {
    const { style } = props;
    const viewStyle = StyleSheet.compose(style, { flexDirection: "row", justifyContent: "center", alignItems: "center" })
    return (
        <View style={viewStyle}>
            {props.children}
        </View>
    )
}