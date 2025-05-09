from numpy import random, pi
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
def chsh_game(strategy, x = -1, y = -1):

    if x == -1:
        x = random.randint(0,2)
    if y == -1:
        y = random.randint(0,2)

    a,b = strategy(x,y)

    if(a!=b) == (x&y):
        return 1
    return 0

def chsh_circuit(x,y):
    game = QuantumCircuit(2, 2)

    game.h(0)
    game.cx(0,1)
    game.barrier()

    if x == 0:
        game.ry(0,0)
    else:
        game.ry(-pi/2, 0)
    game.measure(0,0)
    
    if y == 0:
        game.ry(-pi/4,1)
    else:
        game.ry(pi/4, 1)
    game.measure(1,1)

    return game

def quantum_strategy(x,y):
    runner = AerSimulator().run(chsh_circuit(x,y), shots=1).result()
    statistics = runner.get_counts()

    bits = list(statistics.keys())[0]
    return bits[0], bits[1]

def classical_strategy(x,y):
    if x == 0:
        a = 0
    else:
        a = 1
    
    if y == 0:
        b = 1
    else:
        b = 0
    return a,b

def simulate_chsh_game(numberOfTimes):
    totalScoreQuantum = 0
    totalScoreClassical = 0

    for _ in range(numberOfTimes):
        totalScoreQuantum += chsh_game(quantum_strategy)
        totalScoreClassical += chsh_game(classical_strategy)
    
    return {
        "attempts": numberOfTimes,
        "totalScoreQuantum": totalScoreQuantum,
        "quantumWinningPercentage": totalScoreQuantum/numberOfTimes,
        "totalScoreClassical": totalScoreClassical,
        "classicalWinningPercentage": totalScoreClassical/numberOfTimes
    }