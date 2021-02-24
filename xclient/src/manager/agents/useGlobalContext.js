import { createContext, useContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const values = { value: "hello" }

    return (
        <AppContext.Provider {...values}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext }