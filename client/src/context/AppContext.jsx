import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from '../assets/assets'


const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [ user, setUser ] = useState(null);
    const [ chats, setChats ] = useState([]);
    const [selectedChat, setSelectedChat ] = useState(null);
    const [ theme, setTheme ] = useState(localStorage.getItem('theme') || 'light');

    const value = {
        navigate, user, setUser, chats, setChats, selectedChat, setSelectedChat, theme, setTheme
    };

    //fetch user 
    const fetchUser = async () => {
        setUser(dummyUserData)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    //fetching user chat
    const fetchUserChats = async() => {
        setChats(dummyChats)
        setSelectedChat(dummyChats[0])
    }

    useEffect(() => {
        if(user) {
            fetchUserChats()
        }
        else{
            setChats([])
            setSelectedChat(null)
        }
    }, [user])

    //fetching theme
    useEffect(() => {
        if(theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark');
        }
    }, [theme])

    return (
        <>
            <AppContext.Provider value={value} >
                {children}
            </AppContext.Provider>
        </>
    )
}

export function useAppContext(){
    return useContext(AppContext)
}