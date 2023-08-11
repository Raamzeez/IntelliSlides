import React, { createContext, ReactNode, useContext, useState } from "react"
import iPresentation from "../models/presentation"
import iUser from "../models/user"
import api from "../axios"

interface iStore {
    user: iUser | null
    presentations: iPresentation[]
    setUser: (user: iUser | null) => void
    setPresentations: (presentations: iPresentation[]) => void
    hydrateAll: () => void
    hydrateUser: () => void
    hydratePresentations: () => void
}

const initialStore: iStore = {
    user: null,
    presentations: [],
    setUser: () => {},
    setPresentations: () => {},
    hydrateAll: () => {},
    hydrateUser: () => {},
    hydratePresentations: () => {},
}

const StoreContext = createContext<iStore>(initialStore)

export function useStore() {
    return useContext(StoreContext)
}

type iProps = {
    children: ReactNode
}

export const StoreProvider = ({ children }: iProps) => {
    const [store, setStore] = useState<iStore>(initialStore)

    const hydrateUser = async (): Promise<iUser | null> => {
        if (localStorage.getItem("id_token")) {
            const response = await api.get("/user/userInfo")
            if (response.status !== 200) {
                setStore({ ...store, user: null })
                return null
            }
            setStore({ ...store, user: response.data })
            console.log("hydratedUser", response.data)
            return response.data
        } else {
            setStore({ ...store, user: null })
            return null
        }
    }

    const hydratePresentations = async (): Promise<iPresentation[] | null> => {
        if (store.user) {
            const response = await api.get("/user/presentations")
            if (response.status !== 200) {
                setStore({ ...store, presentations: null })
                return null
            }
            const presentations = response.data
            console.log("hydratedPresentations", response.data)
            setStore({ ...store, presentations })
        } else {
            setStore({ ...store, presentations: null })
            return null
        }
    }

    const hydrateAll = async () => {
        await hydrateUser()
        await hydratePresentations()
    }

    const setUser = (user: iUser | null) => {
        setStore({ ...store, user })
    }

    const setPresentations = (presentations: iPresentation[]) => {
        setStore({ ...store, presentations })
    }

    return (
        <StoreContext.Provider value={{ ...store, setUser, setPresentations, hydrateAll }}>
            {children}
        </StoreContext.Provider>
    )
}
