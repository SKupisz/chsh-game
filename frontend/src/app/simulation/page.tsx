import { SimulationWrapper } from "@/components/simulation/simulationComponent/SimulationComponent";
import { Typography } from "@mui/material";
import styles from './page.module.css'

export default function Simulation () {
    return <>
        <Typography 
            className={styles.header} 
            fontWeight="semibold" 
            variant="h1" 
            align="center" 
            padding={5}
        >
            Simulate the game
        </Typography>
        <SimulationWrapper />
    </>
}