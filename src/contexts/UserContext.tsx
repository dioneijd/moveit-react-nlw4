
import { createContext, ReactNode, useState,  } from "react"
import api from '../services/gitApi'


import { useRouter } from 'next/router'


interface UserContextData {
    getGitUserData: (userName: string) => void
    userData: UserData
}

interface UserProviderProps {
    children: ReactNode
}

interface UserData {
    gitUser: string
    name: string
    avatarUrl: string
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: UserProviderProps){

    const [userData, setUserData] = useState({} as UserData)
    const router = useRouter()
    

    async function getGitUserData(userName: string){
        const resp = await api.get(`/users/${userName}`)

        if (resp.status == 200) {
            
            setUserData({
                gitUser: resp.data.login,
                name: resp.data.name || '',
                avatarUrl: resp.data.avatar_url || ''
            })

            router.push('/')

        } 
        else {
            console.log('ERRO')
            console.log(resp)
        }

    }
    



    return (
        <UserContext.Provider 
            value={{
                getGitUserData,
                userData
            }}
        >
            {children}
        </UserContext.Provider>
    )    
}