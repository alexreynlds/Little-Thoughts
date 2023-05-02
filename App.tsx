import AppContainer from './src/components/app-container'
import React from 'react'
import Navigator from './src/'
import 'react-native-gesture-handler'
import { AppContext, AppContextType } from './src/app-context'

export default function App() {
    const [coins, setCoins] = React.useState(0)

    const appContextValue: AppContextType = {
        coins,
        setCoins
    }

    return (
        <AppContext.Provider value={appContextValue}>
            <AppContainer>
                <Navigator />
            </AppContainer>
        </AppContext.Provider>
    )
}
