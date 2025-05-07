from fastapi import FastAPI, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from chsh import simulate_chsh_game

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/simulate/{numOfSimulations}')
def simulate (numOfSimulations: int = Path(..., gt=0, description="Number of simulations must be a positive integer")):
    return simulate_chsh_game(numOfSimulations)