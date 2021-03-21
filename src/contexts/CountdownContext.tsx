import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengeContext";

interface CountdownContextData {
    minutes: number
    seconds: number
    hasFinished: boolean
    isActive: boolean
    timePerc: number
    startCountdown: () => void
    resetCountdown: () => void
}

interface CountdownProviderProps {
    children: ReactNode
}

let countdownTimeout: NodeJS.Timeout
const defaultTimeInSeconds = 0.1 * 60


export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps){

    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(defaultTimeInSeconds) // seconds
    const [timePerc, setTimePerc] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)


    function startCountdown(){
        setIsActive(true)
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(defaultTimeInSeconds)
        setTimePerc(0)
        setHasFinished(false)
    }

    useEffect(() => {

        if (isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                const newTimePerc = Math.floor((defaultTimeInSeconds - time + 1 ) * 100 / defaultTimeInSeconds )
                
                console.log(`dft: ${defaultTimeInSeconds} | time: ${time} | newPerc: ${newTimePerc}`)
                setTime(time - 1)
                setTimePerc(newTimePerc)
            }, 1000)
        }
        else if (isActive && time == 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }

    }, [ isActive, time ])

    return (
        <CountdownContext.Provider 
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                timePerc,
                startCountdown,
                resetCountdown
            }}>
                {children}
        </CountdownContext.Provider>
    )    
}