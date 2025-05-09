'use client'

import { Alert, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react"
import FeedbackIcon from '@mui/icons-material/Feedback';
import styles from './GameWrapper.module.css'
import axios from "axios";

type GameData = {
    x: number,
    y: number
}

type UserAnswer = -1 | 0 | 1;

type Result = {
    result: number
}

export const GameWrapper = () => {

    const [phase, setPhase] = useState<'begin' | 'answer' | 'victory' | 'defeat'>('begin');
    const [error, setError] = useState('');
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [userAnswer, setUserAnswer] = useState<UserAnswer>(-1);

    const handleStartingTheGame = async() => {
        try {
            setError('');
            setGameData(null);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/game/initialize`);
            const data = res.data;
            setGameData(data as GameData);
            setUserAnswer(-1);
            setPhase('answer');
        } catch {
            setError('Failed to initialize the game')
        }
    }

    const handleUserAnswer = async(answer: UserAnswer) => {
        setUserAnswer(answer);
        try {
            setError('');
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/game/play_classical`, {
                ...gameData,
                a: answer
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = res.data as Result;
            setPhase(data.result === 0 ? 'defeat' : 'victory');
        } catch {
            setError('Failed to play the classical strategy');
            setUserAnswer(-1);
        }
    }

    const handleQuantumPlay = async() => {
        try {
            setError('');
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/game/play_quantum`, {
                ...gameData
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = res.data as Result;
            setPhase(data.result === 0 ? 'defeat' : 'victory');
        } catch {
            setError('Failed to play the quantum strategy');
        }
    }

    const resetGame = () => {
        setError('');
        setUserAnswer(-1);
        setGameData(null);
        setPhase('begin');
    }

    return (<div className={styles.gameWrapper}>
        {
            phase === 'begin' ? (
                <Button variant="contained" onClick={handleStartingTheGame}>
                    Start the game
                </Button>
            ) : phase === 'answer' ? (<>
                <Typography paddingTop={4} paddingBottom={10} variant="h3" align="center">
                    Your question is: {gameData?.x}
                </Typography>
                <Grid container spacing={4} sx={{
                    justifyContent: 'center',
                    alignItems: 'start',
                    width: '100%'
                }}>
                    <Grid size={6}>
                        <Stack spacing={2} width={'100%'}>
                            <Typography align="center" variant="h5">
                                Classical strategy
                            </Typography>
                            <Divider />
                            <Button 
                                variant="contained" 
                                onClick={() => handleUserAnswer(0)}
                                disabled={userAnswer !== -1}
                            >
                                <Typography fontSize={28} padding={10}>
                                    0
                                </Typography>
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={() => handleUserAnswer(1)}
                                disabled={userAnswer !== -1}
                            >
                                <Typography fontSize={28} padding={10}>
                                    1
                                </Typography>
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Stack spacing={2} width={'100%'}>
                            <Typography align="center" variant="h5">
                                Quantum strategy
                            </Typography>
                            <Divider />
                            <Typography align="center" fontSize={20} paddingTop={3} paddingBottom={4}>
                                Strategy: {gameData?.x === 0 ? 'M' : 'Apply the unitary gate, m'}easure and send
                            </Typography>
                            <Button variant="contained" onClick={handleQuantumPlay}>
                                <Typography fontSize={28} padding={10}>
                                    Play
                                </Typography>
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </>) : (
                <>
                    <Alert icon={<FeedbackIcon />} severity={phase === 'victory' ? "success" : "error"}>
                        {phase === "victory" ? "You've won!" : "You've lost!"}
                    </Alert>
                    <Button variant="contained" onClick={resetGame}>
                        Play again
                    </Button>
                </>
            )
        }
        {
            error && <Alert icon={<FeedbackIcon />} severity="error">
                {error}
            </Alert>
        }
    </div>)
}