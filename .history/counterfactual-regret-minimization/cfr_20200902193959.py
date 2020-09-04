from enum import IntEnum
import random

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

def create_strategy():
  probability = 1.0 / len(actions)
  return dict(((action, probability) for action in actions))


strategies = (create_strategy() for player in players)

def create_regrets():
  return dict((action, 0) for action in actions)


regrets = (create_regrets() for player in players)

def cfr(numberOfIterations: int):
  for iteration in range(numberOfIterations):
    cfr_iteration()


def cfr_iteration():
  chosen_actions = (choose_action(strategy) for strategy in strategies)
  outcome = outcomes[chosen_actions]


def choose_action(strategy):
  return random.choices(strategy.keys(), weights=strategy.values(), k=1)[0]

# class Tree:
#   def __init__(self):
#     self.root = None


# class Node:
#   def __init__(self):



# def createGameTree():



cfr(numberOfIterations = 1000)
