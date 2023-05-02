import React, { createContext } from 'react'

export interface AppContextType {
    coins: number
    setCoins: (coins: number) => void
}

export const AppContext = React.createContext<AppContextType>({
    coins: 0,
    setCoins: (coins: number) => {}
})
