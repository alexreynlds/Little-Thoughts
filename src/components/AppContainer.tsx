import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { NativeBaseProvider } from "native-base"
import Theme from "./Theme"

type Props = {
    children: React.ReactNode
}

export default function AppContainer(props: Props) {
    return <NativeBaseProvider theme={Theme}>{props.children}</NativeBaseProvider>
}
