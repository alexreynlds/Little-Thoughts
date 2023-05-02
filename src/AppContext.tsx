import React, { createContext } from "react"

export interface AppContextType {
    coins: number
    setCoins: (coins: number) => void
    canSeeLogin: string
    setCanSeeLogin: (canSeeLogin: string) => void
}

export const AppContext = React.createContext<AppContextType>({
    coins: 0,
    setCoins: (coins: number) => {},
    canSeeLogin: "yes",
    setCanSeeLogin: (canSeeLogin: string) => {
        console.log(canSeeLogin)
    },
})
