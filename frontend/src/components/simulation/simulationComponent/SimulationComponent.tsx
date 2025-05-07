'use client'

import styles from './SimulationComponent.module.css'
import { Button, CircularProgress, Grid, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { ChangeEvent, useState } from "react";

type Result = {
    attempts: number,
    totalScoreQuantum: number,
    quantumWinningPercentage: number,
    totalScoreClassical: number,
    classicalWinningPercentage: number
}

export const SimulationWrapper = () => {
    const [result, setResult] = useState<Result|null>(null);
    const [status, setStatus] = useState<'neutral'|'loading'|'error'>('neutral');
    const [trialNumbers, setTrialNumbers] = useState(1);

    const media = useMediaQuery('(min-width: 768px)');

    const handleSetTrialNumbers = (event: ChangeEvent<HTMLInputElement>) => {
        const newTrialNumber = parseInt(event.target.value);
        if(!isNaN(newTrialNumber)){
            setTrialNumbers(newTrialNumber);
        }
    }

    const handleTrialSubmission = async() => {
        try {
            setStatus('loading');
            setResult(null);
            const res = await axios.get(`http://localhost:8000/simulate/${trialNumbers}`);
            const data = res.data as Result;
            setResult(data);
            setStatus('neutral');
        } catch {
            setStatus('error');
        }
    }

    return (
        <div className={styles.gridWrapper}>
            <Grid container spacing={2} sx={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Grid size={media ? 8 : 12}>
                    <TextField 
                        variant="filled"
                        fullWidth
                        label="Number of trials"
                        placeholder="Enter the number of trials..."
                        type="number"
                        slotProps={{
                            htmlInput: {
                                min: 1,
                                max: 1000,
                                step: 1
                            }
                        }}
                        value={trialNumbers}
                        onChange={handleSetTrialNumbers}
                        disabled={status === 'loading'}
                    />
                </Grid>
                <Grid size={media ? 2 : 12}>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={handleTrialSubmission}
                        disabled={status === 'loading'}
                    >
                        Simulate
                    </Button>
                </Grid>
            </Grid>
            <Stack spacing={2} alignItems={'center'} paddingTop={10} paddingBottom={7}>
                {
                    status === 'loading' ? <CircularProgress/>
                    : result !== null && (
                        <>
                            <Typography variant="h6">
                                Trials overall: {result.attempts}
                            </Typography>
                            <Typography variant="h6">
                                Percentage of classical victories: {result.classicalWinningPercentage*100}%
                            </Typography>
                            <Typography variant="h6">
                                Percentage of quantum victories: {result.quantumWinningPercentage*100}%
                            </Typography>
                        </>
                    )
                }
            </Stack>
            {
                result !== null &&       
                <BarChart xAxis={[{
                    id: 'barCategories',
                    data: ['classical', 'quantum']
                }]}
                    series={[
                        {
                            data: [result.totalScoreClassical, result.totalScoreQuantum]
                        }
                    ]}
                    height={400}
                    
                />
                
            }
        </div>
    )
};