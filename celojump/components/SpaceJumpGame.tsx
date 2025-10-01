'use client'

import { useEffect, useRef, useState } from 'react'
import { useSetScore } from '../smartcontracthooks'
import { useAccount } from 'wagmi'
import Leaderboard from './Leaderboard'
import CustomModal from './CustomModal'
import LoadingSpinner from './LoadingSpinner'
import styles from './SpaceJumpGame.module.css'

export default function SpaceJumpGame() {
  const gameInitialized = useRef(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [isSubmittingScore, setIsSubmittingScore] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const currentScoreRef = useRef(0)
  
  // Modal states
  const [modal, setModal] = useState<{
    isVisible: boolean
    title: string
    message: string
    type: 'info' | 'success' | 'error' | 'confirm'
    onConfirm?: () => void
    onCancel?: () => void
  }>({
    isVisible: false,
    title: '',
    message: '',
    type: 'info'
  })
  
  const { address, isConnected } = useAccount()
  const { setScore, isLoading: isSettingScore, isSuccess, error } = useSetScore(
    () => {
      setSubmissionStatus('success')
      setIsSubmittingScore(false)
      
      // Show success for 2 seconds, then show leaderboard
      setTimeout(() => {
        setSubmissionStatus('idle')
        setShowLeaderboard(true)
      }, 2000)
    },
    (error) => {
      console.error('Error submitting score:', error)
      setSubmissionStatus('error')
      setIsSubmittingScore(false)
      
      // Show error modal
      setModal({
        isVisible: true,
        title: 'Transaction Failed',
        message: `Failed to submit score: ${error.message}`,
        type: 'error'
      })
      
      // Reset status after showing modal
      setTimeout(() => {
        setSubmissionStatus('idle')
      }, 3000)
    }
  )

  const handleSubmitScore = async () => {
    // Reset status if retrying after error
    if (submissionStatus === 'error') {
      setSubmissionStatus('idle')
    }
    
    if (!isConnected) {
      setModal({
        isVisible: true,
        title: 'Wallet Required',
        message: 'Please connect your wallet first to submit your score!',
        type: 'info'
      })
      return
    }

    if (!address) {
      setModal({
        isVisible: true,
        title: 'Error',
        message: 'Wallet address not found!',
        type: 'error'
      })
      return
    }

    const finalScore = parseInt(document.getElementById('finalScore')?.textContent || '0')
    if (finalScore <= 0) {
      setModal({
        isVisible: true,
        title: 'Invalid Score',
        message: 'Invalid score! Play the game first.',
        type: 'error'
      })
      return
    }

    // Show confirmation dialog
    setModal({
      isVisible: true,
      title: 'Confirm Submission',
      message: `Submit score of ${finalScore} to the blockchain? This will require a transaction fee.`,
      type: 'confirm',
      onConfirm: async () => {
        setIsSubmittingScore(true)
        setSubmissionStatus('loading')
        try {
          await setScore(finalScore)
        } catch (error) {
          console.error('Error submitting score:', error)
          setIsSubmittingScore(false)
          setSubmissionStatus('error')
        }
      },
      onCancel: () => {
        // Do nothing, just close modal
      }
    })
  }

  const closeModal = () => {
    setModal(prev => ({ ...prev, isVisible: false }))
  }

  const setupGameEventListeners = (gameInstance: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Setting up game event listeners...', { gameInstance })
    }
    
    // Submit Score button (our new functionality)
    const submitScoreBtn = document.getElementById('submitScoreBtn')
    if (submitScoreBtn) {
      submitScoreBtn.onclick = handleSubmitScore
    }

    // Game Over screen buttons
    const playBtn = document.getElementById('playBtn')
    if (playBtn && gameInstance.restartGame) {
      playBtn.onclick = () => gameInstance.restartGame()
    }

    const topScorerBtn = document.getElementById('topScorerBtn')
    if (topScorerBtn) {
      // Use our leaderboard instead of the game's built-in one
      topScorerBtn.onclick = () => setShowLeaderboard(true)
    }

    const exitBtn = document.getElementById('exitBtn')
    if (exitBtn && gameInstance.exitGame) {
      exitBtn.onclick = () => gameInstance.exitGame()
    }

    // Start screen buttons
    const startPlayBtn = document.getElementById('startPlayBtn')
    if (startPlayBtn && gameInstance.startGame) {
      startPlayBtn.onclick = () => gameInstance.startGame()
    }

    const startLeaderboardBtn = document.getElementById('startLeaderboardBtn')
    if (startLeaderboardBtn) {
      // Use our leaderboard instead of the game's built-in one
      startLeaderboardBtn.onclick = () => setShowLeaderboard(true)
    }

    const startExitBtn = document.getElementById('startExitBtn')
    if (startExitBtn && gameInstance.confirmExit) {
      startExitBtn.onclick = () => gameInstance.confirmExit()
    }

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ All game button event listeners configured')
      console.log('Available methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(gameInstance)))
    }
  }

  useEffect(() => {
    if (gameInitialized.current) return
    gameInitialized.current = true

    // Load the game engine script
    const script = document.createElement('script')
    script.src = '/game-engine.js'
    script.onload = () => {
      // Initialize the game when script is loaded
      const gameInstance = new (window as any).SpaceJumpGameClass()
      
      // Set up event listeners for our new buttons after a short delay
      // to ensure all DOM elements are ready
      setTimeout(() => {
        setupGameEventListeners(gameInstance)
      }, 100)
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="/game-engine.js"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return (
    <div id="gameContainer" className={styles.gameContainer}>
      <canvas id="gameCanvas" className={styles.gameCanvas}></canvas>
      
      <div id="ui" className={styles.ui}>
        <div id="score" className={styles.score}>0</div>
        
        <div id="controls" className={styles.controls}>
          <div className={`${styles.controlBtn} ${styles.leftBtn}`} id="leftBtn"></div>
          <div className={`${styles.controlBtn} ${styles.rightBtn}`} id="rightBtn"></div>
        </div>
        
        <div id="gameOver" className={styles.gameOver}>
          <h2>Game Over!</h2>
          <p>Your Score: <span id="finalScore">0</span></p>
          <div className={styles.gameOverButtons}>
            <button id="playBtn" className={styles.actionBtn}>Play Again</button>
            <button 
              id="submitScoreBtn" 
              className={`${styles.actionBtn} ${submissionStatus === 'success' ? styles.successBtn : ''} ${submissionStatus === 'error' ? styles.errorBtn : ''}`}
              disabled={isSubmittingScore || !isConnected}
            >
              <div className={styles.buttonContent}>
                {submissionStatus === 'loading' && <LoadingSpinner size="small" color="#fff" />}
                {submissionStatus === 'success' && <span className={styles.successIcon}>✓</span>}
                {submissionStatus === 'error' && <span className={styles.errorIcon}>✗</span>}
                <span className={styles.buttonText}>
                  {submissionStatus === 'loading' && 'Submitting...'}
                  {submissionStatus === 'success' && 'Score Submitted!'}
                  {submissionStatus === 'error' && 'Failed - Retry'}
                  {submissionStatus === 'idle' && (isConnected ? 'Submit Score to Chain' : 'Connect Wallet First')}
                </span>
              </div>
            </button>
            <button id="topScorerBtn" className={styles.actionBtn}>Leaderboard</button>
            <button id="exitBtn" className={styles.actionBtn}>Exit</button>
          </div>
          
          {submissionStatus === 'success' && (
            <div className={styles.successMessage}>
              🎉 Score successfully recorded on the blockchain!
            </div>
          )}
        </div>
        
        <div id="startScreen" className={styles.startScreen}>
          <img 
            src="https://docs.celo.org/img/logo-dark.png" 
            alt="Celo Logo" 
            style={{ width: 204, height: 64, marginBottom: 16 }}
          />
          <h1 style={{textDecoration:"uppercase"}}>Jump</h1>
          <p>Jump on platforms and reach for the stars! Use the arrow buttons to move left and right.</p>
          <div className={styles.startButtons}>
            <button id="startPlayBtn" className={styles.startBtn}>Start Game</button>
            <button id="startLeaderboardBtn" className={styles.startBtn}>Leaderboard</button>
            <button id="startExitBtn" className={styles.startBtn}>Exit</button>
          </div>
        </div>
      </div>
      
      <Leaderboard 
        isVisible={showLeaderboard} 
        onClose={() => setShowLeaderboard(false)}
        isUpdating={isSubmittingScore}
      />
      
      <CustomModal
        isVisible={modal.isVisible}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
        onClose={closeModal}
        confirmText={modal.type === 'confirm' ? 'Submit' : 'OK'}
        cancelText="Cancel"
      />
    </div>
  )
}
