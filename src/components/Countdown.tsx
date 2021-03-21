import { useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'



export function Countdown(){

    const {
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        timePerc,
        startCountdown, 
        resetCountdown 
    } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')



    return (
        <>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>

                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>


            { hasFinished ? (
                <button 
                    disabled
                    className={`${styles.countdownButton} ${styles.disabledCountdownButton} `}
                >
                    Ciclo Encerrado
                    
                    <div style={{width: `${timePerc}%` }} ></div>
                </button>

            ) : (
                <>
                    {isActive ? (

                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.abortCountdownButton} `}
                            onClick={resetCountdown}
                        >
                            Abandonar o ciclo
                        
                            <div style={{width: `${timePerc}%` }} ></div>
                        </button>
                    
                    ) : (
                    
                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.startCountdownButton}`}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                            
                            <div style={{width: `${timePerc}%` }} ></div>
                        </button> 
                    )}
                </>
            )}
        </>
    )
}