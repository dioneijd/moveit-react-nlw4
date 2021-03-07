import { useContext, useState } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

    const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext)     
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceeded(){
        completedChallenge()
        resetCountdown()
    }

    function handleChallengeFailed(){
        resetChallenge()
        resetCountdown()
    }

    return (
        <div className={styles.challengeBoxContainer}>                
            { activeChallenge ? (
                <div className={styles.challengeAtive}>
                    <header>
                        Ganhe {activeChallenge.amount} xp
                    </header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>EXERCITE-SE</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>

                </div>
            ) : (
                <div className={styles.challengeNotAtive}>
                    <strong>Finalize um ciclo para receber um novo desafio e acumular experiencia.</strong> 
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de nivel completando desafios.
                    </p>
                </div>            
            )}
        </div>

    )
}