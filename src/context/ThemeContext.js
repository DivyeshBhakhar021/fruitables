import { createContext, useReducer } from "react";
import { themereducer } from "./reducer/theme.reducer";
import { TOGGLE_THEME } from "./ActionType";

const initialState = {
    theme: "light"
}

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themereducer, initialState)

    const toggleTheme = () => {
        const newTheme = state.theme === "light" ? "dark" : "light"

        dispatch({ type: TOGGLE_THEME, payload: newTheme })
    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}