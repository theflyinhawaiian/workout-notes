import { PropsWithChildren } from "react";
import { View } from "react-native";

export default function (props: PropsWithChildren) {
    return (
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            {props.children}
        </View>
    )
}