from flask import Flask, url_for, request, redirect
from flask_socketio import SocketIO, emit

import random
import math
from pprint import pprint

'''
suits = {
    1: 'hearts',
    2: 'spades',
    3: 'diamonds',
    4: 'clubs'
}
'''

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

players = []
cards = dict()
trump = 0
teammates = []
round_info = []
round = 0
turn = 0
mode = 1
bid = 100
bidder = ''

cards_to_remove = {
    1: [],
    2: [],
    3: [2],
    4: [],
    5: [2, 28],
    6: [2, 15, 28, 41],
    7: [2, 28, 41], 
    8: [2, 15, 28, 41],
}

def distribute_cards():
    global players
    num_players = len(players)
    total_cards = [i for i in range(1,52+1  ) if i not in cards_to_remove[num_players]]
    cards_per_player = len(total_cards)//num_players
    random.shuffle(total_cards)
    for i,player in enumerate(players):
        cards[player] = total_cards[i*cards_per_player:(i+1)*cards_per_player]

@socketio.on('startGame')
def start(data):
    global mode
    assert mode==2
    distribute_cards()
    emit('getGame', {
        'players': players,
        'cards': cards,
        'bid': bid,
        'bidder': players[0],
        'trump': trump,
        'turn': turn,
        'round': round,
        'mode': mode
    })

@socketio.on('setMode')
def set_mode(data):
    global mode
    mode = data['mode']
    emit('getMode', {'mode': mode}, broadcast=True)

@socketio.on('getInitialData')
def add_player(data):
    emit('setInitialData', {
        'players': players,
        'cards': [],
        'bid': bid,
        'bidder': bidder,
        'trump': trump,
        'turn': turn,
        'round': round,
        'mode': mode
    })

@socketio.on('addPlayer')
def add_player(data):
    print('name')
    print(data)
    global players, ip2name
    num_players = len(players)
    name = data['name']
    players.append(name)
    num_players += 1
    emit('changePlayer', players, broadcast=True)

@socketio.on('reset')
def reset_game(data):
    global num_players, ip2name, players, teammates, round_info, round_num, cards
    num_players = 0
    ip2name = dict()
    players = []
    teammates = []
    round_info = []
    round_num = 0
    cards = dict()
    emit('changePlayer', players, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, port=5000)
