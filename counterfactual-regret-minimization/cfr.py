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


strategies = [create_strategy() for player in players]

def create_regrets():
  return dict((action, 0) for action in actions)


regrets = tuple(create_regrets() for player in players)

def cfr(number_of_iterations: int):
  for iteration in range(number_of_iterations):
    cfr_iteration()


def cfr_iteration():
  chosen_actions = tuple(choose_action(strategy) for strategy in strategies)
  update_regrets(chosen_actions)
  update_strategies()


def choose_action(strategy):
  return random.choices(list(strategy.keys()), weights=strategy.values(), k=1)[0]


def update_regrets(chosen_actions):
  outcome = outcomes[chosen_actions]
  for player_index in range(len(players)):
    if player_index == 0:
      regret = max(0, -outcome)
    elif player_index == 1:
      regret = max(0, +outcome)
    regrets[player_index][chosen_actions[player_index]] += regret


def update_strategies():
  for player_index in range(len(players)):
    update_strategy(player_index)


def update_strategy(player_index: int):
  accumulated_regret = calculate_accumulated_regret(player_index)
  if accumulated_regret == 0:
    strategies[player_index] = create_strategy()
  else:
    strategies[player_index] = dict(
      ((action, 1 - regrets[player_index][action] / accumulated_regret) for action in actions)
    )
    accumulated_percentages = sum(strategies[player_index].values())
    strategies[player_index] = dict(
      ((action, percentage / accumulated_percentages) for (action, percentage) in strategies[player_index].items())
    )


def calculate_accumulated_regret(player_index):
  return sum(regrets[player_index].values())


cfr(number_of_iterations = 100000)
print(strategies)
