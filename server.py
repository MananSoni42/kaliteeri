from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit
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

app = Flask(__name__, static_folder='build', static_url_path='')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

players = []
colors = []
cards = dict()
trump = 0
teammates = []
round = 0
turn = 0
mode = 1
bid = 100
bidder = ''
bidders = dict()

player_points = []

round_offset = 0
round_cards = []
round_winner = 0

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


@socketio.on('startGame')
def fstart(data):
    global mode, players, cards, bidders
    bidders = { player:True for player in players }
    assert mode==2
    if not cards:
        distribute_cards(players, cards)

    emit('getGame', {
        'players': players,
        'cards': {player: sorted(cards[player]) for player in players },
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
    bidders[data['name']] = False
    if sum(bidders.values()) == 1:
        emit('endBid', {
            'bidder': [k for k,v in bidders.items() if v][0]
        }, broadcast=True)
    emit('newBidders', {
        'bidders': [player for player in players if bidders[player]]
    }, broadcast=True)

@socketio.on('getBidder')
def fgetbidder(data):
    emit('setBidder', { 'bidder': players[0] }) 

@socketio.on('bid')
def fbid(data):
    global bid, bidder
    rname = data['name']
    rbid = int(data['bid'])
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
    global turn, player_points, trump, teammates
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
    teammates = cards
    player_points = [(0,0) for player in players ]

    emit('round', {
        'round': 1,
        'turn': players[turn],
        'cards': cards,
        'trump': trump,
    }, broadcast=True)

    mode = 3

@socketio.on('getRound')
def fget_round(data):
    global bidders, bidder, players, round, turn, round_offset, round_cards, round_winner, player_points
    bidder = [k for k,v in bidders.items() if v][0]
    round_offset = players.index(bidder)
    round_winner = round_offset
    round_cards = [0]*len(players)

    emit('newRound', {
        'round': round + 3,
        'players': players,
        'round_offset': round_offset,
        'turn': turn,
        'round_cards': round_cards,
        'points': player_points,
        'trump': trump,
    })

@socketio.on('setMode')
def fset_mode(data):
    global mode
    mode = data['mode']
    emit('getMode', {'mode': mode}, broadcast=True)

@socketio.on('getInitialData')
def fadd_player(data):
    emit('setInitialData', {
        'players': players,
        'colors': colors,
        'cards': [],
        'bid': bid,
        'bidder': bidder,
        'trump': trump,
        'turn': turn,
        'round': round,
        'mode': mode,
        'name': data['name']
    })

@socketio.on('getResults')
def fgetresults(data):
    global cards, players, teammates, player_points, bid, bidder
    t, nt, pts = calc_winners(cards, players, teammates, player_points, bidder)
    emit('setResults', {
        'winners': t if bid <= pts else nt,
        'bid': bid,
        'pts': pts if bid <= pts else 250-pts,
        'losers': nt if bid <= pts else t,
    })

@socketio.on('play')
def fplay(data):
    global turn, players, cards, trump, round_cards, round, round_offset, player_points, bid, teammates, player_points
    name = data['name']
    ind = players.index(data['name'])

    if (ind == (round_offset+turn)%len(players)):
        turn += 1
        round_cards[ind] = int(data['card'])
        
        if turn == len(players):
            emit('newTurn', {
                'turn': turn,
                'round_cards': round_cards,
            }, broadcast=True)


            winner, pts = process_round(round_offset, round_cards, trump)
            round += 1
            round_offset = winner
            turn = 0
            player_points[winner] = (player_points[winner][0]+1, player_points[winner][1]+pts)
            round_cards = [0]*len(players)
            
            if round == 52//len(players) and turn == len(players):
                emit('end', {}, broadcast=True)
            else:
                emit('newRound', {
                    'round': round + 3,
                    'players': players,
                    'round_offset': round_offset,
                    'turn': turn,
                    'round_cards': round_cards,
                    'points': player_points,
                    'trump': trump
                }, broadcast=True)
        else:
            emit('newTurn', {
                'turn': turn,
                'round_cards': round_cards,
            }, broadcast=True)

@socketio.on('getPlayer')
def fget_player(data):
    emit('changePlayer', {'players': players, 'colors': colors})

@socketio.on('addPlayer')
def fadd_player(data):
    global players, ip2name, colors
    num_players = len(players)
    players.append(data['name'])
    colors.append(data['color'])
    num_players += 1
    emit('changePlayer', {'players': players, 'colors': colors}, broadcast=True)

@socketio.on('reset')
def freset_game(data):
    global players, colors, cards, trump, teammates, round, turn, mode, bid, bidder, bidders, player_points, round_offset, round_cards, round_winner
    players = []
    colors = []
    cards = dict()
    trump = 0
    teammates = []
    round = 0
    turn = 0
    mode = 1
    bid = 100
    bidder = ''
    bidders = dict()

    player_points = []

    round_offset = 0
    round_cards = []
    round_winner = 0
    emit('newGame', {}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=False)
