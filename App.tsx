import AppContainer from './src/components/app-container'
import MainScreen from './src/screens/main-screen'
import Navigator from './src/'
import 'react-native-gesture-handler'

export default function App() {
    return (
        <AppContainer>
            <Navigator />
        </AppContainer>
    )
}
