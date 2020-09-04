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

def cfr(number_of_iterations: int):
  for iteration in range(number_of_iterations):
    cfr_iteration()


def cfr_iteration():
  chosen_actions = (choose_action(strategy) for strategy in strategies)
  print('a', chosen_actions)
  update_regrets(chosen_actions)
  update_strategies()


def choose_action(strategy):
  return random.choices(strategy.keys(), weights=strategy.values(), k=1)[0]


def update_regrets(chosen_actions):
  for player_index in range(1, len(players)):
    outcome = outcomes[chosen_actions[player_index]]
    regrets[player_index][chosen_actions[player_index]] += -outcome[player_index]


def update_strategies():
  for player_index in range(1, len(players)):
    update_strategy(player_index)


def update_strategy(player_index: int):
  accumulated_regret = calculate_accumulated_regret(player_index)
  strategy[player_index] = dict(((action, 1 - regret / accumulated_regret) for regret in regrets[player_index]))


def calculate_accumulated_regret(player_index):
  return sum(regrets[player_index].values())


cfr(number_of_iterations = 1000)
