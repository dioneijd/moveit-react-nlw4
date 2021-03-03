import { createContext, useState, ReactNode } from 'react'
import challenges from '../../challenges.json'
import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'

interface ChallengeContextProps {
    children: ReactNode
}

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengeContextData {
    level: number
    currentExperience: number 
    challengesCompleted: number
    activeChallenge: Challenge
    experienceToNextLevel: number
    levelUp: () => void
    startNewChallenge: () => void
    resetChallenge: () => void
    completedChallenge: () => void
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children }: ChallengeContextProps){

    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null as Challenge)
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    

    function levelUp(){
        setLevel(level + 1)
    }

    function startNewChallenge(){
        console.log('começou novo desafio')
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const newChallenge = challenges[randomChallengeIndex] as Challenge

        setActiveChallenge(newChallenge)
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completedChallenge(){
        if (!activeChallenge){
            return
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel){      
            finalExperience = finalExperience - currentExperience      
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completedChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}