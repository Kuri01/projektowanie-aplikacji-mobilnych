import { StatusBar } from "expo-status-bar";
import React, { useCallback, useMemo } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";

interface BoxItem {
    id: string;
    label: string;
    is_visible: boolean;
    backgroundColor: string;
}

type TVisibleBoxes = {
    [key: string]: "all" | number[];
};

type TColorBoxes = {
    [key: number]: string;
};

const Box: React.FC<{ label: string; backgroundColor: string }> = ({
                                                                       label,
                                                                       backgroundColor,
                                                                   }) => {
    const handlePress = () => {
        Alert.alert(`Kliknięto box ${label}`);
    };

    const textColor = backgroundColor === "black" ? "white" : "black";

    return (
        <TouchableOpacity style={styles.box} onPress={handlePress}>
            <Text style={[styles.boxText, { color: textColor }]}>{label}</Text>
        </TouchableOpacity>
    );
};

const visible_boxes_by_id: TVisibleBoxes = {
    view_1: "all",
    view_2: [3, 5, 6, 7, 8, 9],
};

const color_boxes_by_id: TColorBoxes = {
    1: "yellow",
    2: "green",
    3: "pink",
    5: "black",
    6: "blue",
    7: "yellow",
    8: "pink",
    9: "white",
    10: "blue",
};

const generateGrid = (
    rows: number,
    cols: number,
    labelPrefix: string,
    viewKey: string,
): (BoxItem | null)[][] => {
    const grid: (BoxItem | null)[][] = [];
    let id = 1;
    for (let i = 0; i < rows; i++) {
        const row: (BoxItem | null)[] = [];
        for (let j = 0; j < cols; j++) {
            const visible_value = visible_boxes_by_id[viewKey];
            const is_visible = visible_value === "all" || visible_value.includes(id);
            const backgroundColor = color_boxes_by_id[id];
            row.push(
                j <= i
                    ? {
                        id: id.toString(),
                        label: `${labelPrefix}${id++}`,
                        is_visible,
                        backgroundColor,
                    }
                    : null,
            );
        }
        grid.push(row);
    }
    return grid;
};

export default function GridView() {
    const [view, setView] = React.useState("view_2");
    const gridData = useMemo(() => generateGrid(4, 4, "Widok_", view), [view]);

    const handleSetView = useCallback(() => {
        setView(view === "view_1" ? "view_2" : "view_1");
    }, [view]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {gridData.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((item, colIndex) => {
                        const backgroundColor =
                            item && item.is_visible ? item.backgroundColor : "white";

                        return (
                            <View key={colIndex} style={[styles.cell, { backgroundColor }]}>
                                {item && item.is_visible ? (
                                    <Box label={item.label} backgroundColor={backgroundColor} />
                                ) : (
                                    <View style={styles.emptyCell} />
                                )}
                            </View>
                        );
                    })}
                </View>
            ))}
            <View style={styles.button}>
                <TouchableOpacity onPress={handleSetView}>
                    <Text>Change view</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: "flex-start",
    },
    row: {
        flexDirection: "row",
    },
    cell: {
        width: Dimensions.get("window").width / 4,
        height: Dimensions.get("window").width / 4,
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    boxText: {
        fontSize: 16,
    },
    emptyCell: {
        width: "100%",
        height: "100%",
    },
    button: {
        width: "100%",
        marginTop: 20,
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
    },
});
