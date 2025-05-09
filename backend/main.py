from fastapi import FastAPI, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from numpy import random
from chsh import simulate_chsh_game, chsh_game

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3000/game"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GameData(BaseModel):
    x: int
    y: int
    a: int

@app.get('/simulate/{numOfSimulations}')
def simulate (numOfSimulations: int = Path(..., gt=0, description="Number of simulations must be a positive integer")):
    return simulate_chsh_game(numOfSimulations)

@app.get('/game/initialize')
def initializeTheGame():
    x = random.randint(0,2)
    y = random.randint(0,2)
    return {
        "x": x,
        "y": y
    }

@app.post('/game/play_classical')
async def playClassicalStrategy(data: GameData):
    def classical_strategy(x,y):
        if y == 0:
            b = 1
        else:
            b = 0
        return data.a,b
    return {
        "result": chsh_game(classical_strategy, data.x, data.y)
    }