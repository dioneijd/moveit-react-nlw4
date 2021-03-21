import { FormEvent, useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"

import style from '../styles/components/GitLoginBox.module.css'

export default function GitLoginBox(){
    const [userName, setUserName] = useState('')
    const { getGitUserData } = useContext(UserContext)



    function handleGitLogin(e: FormEvent){
        e.preventDefault()
        getGitUserData(userName)
    }


    return (        
        <form onSubmit={handleGitLogin} className={style.gitForm}>
            <input type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button type="submit" disabled={userName == ''}>
                <img src="/icons/arrow-right.svg" alt=""/>
            </button>
        </form>
    )
}