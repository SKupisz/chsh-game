import { Typography } from "@mui/material";
import styles from './page.module.css'
import { GameWrapper } from "@/components/game/gameWrapper/GameWrapper";

export default function Game() {
    return (<>
         <Typography 
            className={styles.header} 
            fontWeight="semibold" 
            variant="h1" 
            align="center" 
            padding={5}
        >
            Play the game
        </Typography>
        <GameWrapper />
    </>)
}