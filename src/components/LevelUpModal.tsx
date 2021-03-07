import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import style from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal(){

    const {level, closeLevelUpModal} = useContext(ChallengesContext)

    return (
        <div className={style.levelUpModalOverlay}>
            <div className={style.levelUpModalContainer}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar"/>
                </button>                
            </div>
        </div>
    )
}