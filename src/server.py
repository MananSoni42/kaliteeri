from flask import Flask, url_for, request, redirect
from flask_socketio import SocketIO, emit
import time
from pprint import pprint
from utils import *

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
bidders = []

@socketio.on('startGame')
def fstart(data):
    global mode, players, cards, bidders
    bidders = { player:True for player in players }
    assert mode==2
    if not cards:
        distribute_cards(players, cards)
    emit('getGame', {
        'players': players,
        'cards': cards,
        'bid': bid,
        'bidder': players[0],
        'trump': trump,
        'turn': turn,
        'round': round,
        'mode': mode,
        'name': data['name']
    })

@socketio.on('fold')
def ffold(data):
    global bidder
    if bidder == data['name']:
        emit('bidError', {})
    else:
        bidders[data['name']] = False
        if sum(bidders.values()) == 1:
            emit('endBid', {
                'bidder': [k for k,v in bidders.items() if v][0]
            }, broadcast=True)

@socketio.on('bid')
def fbid(data):
    global bid, bidder
    rname = data['name']
    rbid = data['bid']
    if rbid > bid and bidders[rname]:
        bid = rbid
        bidder = rname
    if bid == 250:
        emit('endBid', {
            'bidder': rname
        })
    else:
        emit('newBid', { 'bid': bid, 'bidder': rname }, broadcast=True)

@socketio.on('bidComplete')
def fbidcomplete(data):
    global turn
    print(data)
    trump = data['trump'][-1]
    suit = dict()
    val = dict()
    for s in data['suit']:
        k,v = s.split('-')
        suit[k] = v
    for v_ in data['val']:
        k,v = v_.split('-')
        val[k] = v

    n = len(suit)
    cards = []
    cards.append(int(suit['1'])*13 + int(val['1']) - 13)
    if n == 2:
        cards.append(int(suit['2'])*13 + int(val['2']) - 13)

    print(trump, suit, val)
    emit('round', {
        'round': 1,
        'turn': players[turn],
        'cards': [16, 14],
        'trump': trump,
    }, broadcast=True)
    turn += 1


@socketio.on('setMode')
def fset_mode(data):
    global mode
    mode = data['mode']
    emit('getMode', {'mode': mode}, broadcast=True)

@socketio.on('getInitialData')
def fadd_player(data):
    emit('setInitialData', {
        'players': players,
        'cards': [],
        'bid': bid,
        'bidder': bidder,
        'trump': trump,
        'turn': turn,
        'round': round,
        'mode': mode,
        'name': data['name']
    })

@socketio.on('addPlayer')
def fadd_player(data):
    print('name')
    print(data)
    global players, ip2name
    num_players = len(players)
    name = data['name']
    players.append(name)
    num_players += 1
    emit('changePlayer', players, broadcast=True)

@socketio.on('reset')
def freset_game(data):
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
