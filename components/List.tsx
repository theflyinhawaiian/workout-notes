import { FlatList, FlatListProps } from "react-native";

export default function<TItem>(props: FlatListProps<TItem>){
    return (
        <FlatList style={{ flexGrow: 0}} {...props} />
    );
}