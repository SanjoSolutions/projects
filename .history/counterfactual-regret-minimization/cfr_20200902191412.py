from enum import IntEnum

# Rock Paper Scissor
class Actions(IntEnum):
  Rock = 1
  Paper = 2
  Scissor = 3


class Players(IntEnum):
  Player1 = 1
  Player2 = 2


actions = (Actions.Rock, Actions.Paper, Actions.Scissor)
players = (Players.Player1, Players.Player2)
outcomes = {
  (Actions.Rock, Actions.Rock): 0,
  (Actions.Rock, Actions.Paper): -1,
  (Actions.Rock, Actions.Scissor): 1,
  (Actions.Paper, Actions.Rock): 1,
  (Actions.Paper, Actions.Paper): 0,
  (Actions.Paper, Actions.Scissor): -1,
  (Actions.Scissor, Actions.Rock): -1,
  (Actions.Scissor, Actions.Paper): 1,
  (Actions.Scissor, Actions.Scissor): 0
}

def cfr(numberOfIterations: int):
  pass


cfr(numberOfIterations = 1000)
