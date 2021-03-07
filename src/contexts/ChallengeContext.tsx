import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface ChallengeContextProps {
    children: ReactNode
    level: number
    currentExperience: number
    challengesCompleted: number
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
    isLevelUpModalOpen: boolean
    levelUp: () => void
    startNewChallenge: () => void
    resetChallenge: () => void
    completedChallenge: () => void
    closeLevelUpModal: () => void
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children, ...currentData }: ChallengeContextProps){

    const [level, setLevel] = useState(currentData.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(currentData.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(currentData.challengesCompleted ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null as Challenge)

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    

    useEffect(() => {
        Notification.requestPermission()
    }, [])
    
    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge(){
        console.log('começou novo desafio')
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const newChallenge = challenges[randomChallengeIndex] as Challenge

        setActiveChallenge(newChallenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted'){
            new Notification('Novo Desafio 🎉', {
                body: `Valendo ${newChallenge.amount}xp`,
                silent: true
            })
        }

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
                isLevelUpModalOpen,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completedChallenge,
                closeLevelUpModal
            }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>
    )
}