'use client'

import { useState, useEffect } from 'react'
import { useTopScores, useMyScore, useMyRank } from '../smartcontracthooks'
import { useAccount, useChainId } from 'wagmi'
import {
  celo, 
  celoAlfajores, 
} from 'viem/chains'
import styles from './Leaderboard.module.css'

interface LeaderboardProps {
  isVisible: boolean
  onClose: () => void
  isUpdating?: boolean
}

export default function Leaderboard({ isVisible, onClose, isUpdating = false }: LeaderboardProps) {
  const [limit, setLimit] = useState(10)
  const { address } = useAccount()
  const chainId = useChainId()
  
  const { data: topScores, isLoading: scoresLoading, error: scoresError, refetch: refetchScores } = useTopScores(limit)
  const { data: myScore, error: myScoreError } = useMyScore()
  const { data: myRank, error: myRankError } = useMyRank()

  // Debug logging (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Leaderboard Debug:', {
        address,
        chainId,
        expectedChainId: celoAlfajores.id,
        isCorrectNetwork: chainId === celoAlfajores.id,
        topScores,
        scoresLoading,
        scoresError: scoresError?.message,
        myScore,
        myScoreError: myScoreError?.message,
        myRank,
        myRankError: myRankError?.message,
        limit
      })
    }
  }, [address, chainId, topScores, scoresLoading, scoresError, myScore, myScoreError, myRank, myRankError, limit])

  useEffect(() => {
    if (isVisible) {
      refetchScores()
    }
  }, [isVisible, refetchScores])

  if (!isVisible) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.leaderboard}>
        <div className={styles.header}>
          <h2>🏆 Leaderboard</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        {chainId !== celoAlfajores.id && (
          <div className={styles.networkWarning}>
            <p>⚠️ Wrong Network</p>
            <p>Please switch to Celo Alfajores to view scores</p>
          </div>
        )}
        
        {address && (
          <div className={styles.myStats}>
            <h3>Your Stats</h3>
            <div className={styles.statRow}>
              <span>Your Score: {myScore !== undefined ? myScore : 'Loading...'}</span>
              <span>Your Rank: {myRank !== undefined ? `#${myRank}` : 'Loading...'}</span>
            </div>
            {(myScoreError || myRankError) && (
              <div style={{color: '#ff6b6b', fontSize: '12px', marginTop: '5px'}}>
                {myScoreError?.message || myRankError?.message}
              </div>
            )}
          </div>
        )}

        <div className={styles.controls}>
          <label>
            Show top:
            <select 
              value={limit} 
              onChange={(e) => setLimit(Number(e.target.value))}
              className={styles.limitSelect}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
          <button onClick={refetchScores} className={styles.refreshBtn}>
            🔄 Refresh
          </button>
        </div>

        <div className={styles.scoresContainer}>
          {scoresError ? (
            <div className={styles.error}>
              <p>Error loading scores: {scoresError.message}</p>
              <button onClick={refetchScores} className={styles.retryBtn}>
                Retry
              </button>
            </div>
          ) : scoresLoading || isUpdating ? (
            <div className={styles.loading}>
              {isUpdating ? 'Updating scores...' : 'Loading scores...'}
            </div>
          ) : topScores && topScores.length > 0 ? (
            <div className={styles.scoresList}>
              {topScores.map((score, index) => (
                <div 
                  key={score.user} 
                  className={`${styles.scoreRow} ${score.user === address ? styles.myScore : ''}`}
                >
                  <div className={styles.rank}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div className={styles.address}>
                    {score.user === address ? 'You' : `${score.user.slice(0, 6)}...${score.user.slice(-4)}`}
                  </div>
                  <div className={styles.score}>{score.score.toLocaleString()}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noScores}>
              No scores yet. Be the first to submit your score!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
