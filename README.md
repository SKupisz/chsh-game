# CHSH game

This application is the playable version of the CHSH nonlocal game, implementing both the classical and quantum strategies.

**Introduction to CHSH game**

The Clauser–Horne–Shimony–Holt game, shortened to CHSH game, is a 2-player nonlocal game, which means the players cannot communicate. The game is conducted through the player called referee, which asks player A and B questions, being either 0 or 1. Players have to respond to those binary questions with either 0 or 1, too. Then, the referee gives a verdict - the players win if the result of the exclusive alternative, known as `XOR` operation, of the responses, say `a` and `b`, is equal to the intersection, known as `AND`, of the questions, say `x` and `y`. Otherwise, the players lose.

**Why is quantum strategy envolved?**

With the use of a classical strategy, players have around `75%` chances of winning. That is unless they do not share an `e-bit`, which marks the unit of entanglement. If two players are using the shared system of 2 qubits entangled with each other, which briefly means that if we measure one of them, we can determine the state of the other one, their probability of victory increases from `75%` to $`(2 + \sqrt{2})/4`$, which is around `85%`.

**How to run this project?**

1. Install python ^3.10.12 & pip ^24.2
2. Install npm ^10.1.0 && node ^20.9.0
3. Clone this repo
4. Go to the `backend` folder
5. Execute `pip install -r requirements.txt`
6. Run `uvicorn main:app --reload --port 8000`
7. Go to the `frontend` folder
8. Execute `npm i`
9. Create an ENV file, where you'll place the variable indicating your backend's API URL (in case of running it locally, NEXT_PUBLIC_BACKEND_API=http://localhost:8000)
10. Run `npm run dev`
11. Go to `http://localhost:3000`