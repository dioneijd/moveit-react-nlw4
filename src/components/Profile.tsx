import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/components/Profile.module.css'

export function Profile(){

    const { level } = useContext(ChallengesContext)
    const { userData } = useContext(UserContext)

    return (
        <div className={styles.profileContainer}>
            <img src={userData.avatarUrl} alt={userData.name}/>
            <div>
                <strong>{userData.name}</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}