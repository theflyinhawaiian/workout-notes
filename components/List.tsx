import { FlatList, FlatListProps, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface ListProps<TItem> extends FlatListProps<TItem> {
    listStyle?: StyleProp<ViewStyle>;
}

export default function<TItem>(props: ListProps<TItem>){
    const { listStyle } = props;
    const viewStyle = StyleSheet.compose(listStyle, { flexGrow: 0 })
    return (
        <FlatList style={viewStyle} {...props} />
    );
}