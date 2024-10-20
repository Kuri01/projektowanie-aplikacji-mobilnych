import React from "react";
import Calculator from "./components/Calculator";
import {PaperProvider} from "react-native-paper";

export default function App() {
    return (
        <PaperProvider>
            <Calculator />
        </PaperProvider>
    );
}