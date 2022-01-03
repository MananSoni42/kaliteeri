from flask import Flask, url_for, request, redirect
import random
import math
from pprint import pprint

app = Flask(__name__)

num_players = 0
ip2name = dict()
players = []
teammates = []
round_info = []
round_num = 0
cards = dict()

cards_to_remove = {
    5: [1,2],
    6: [1,],
    7: [1,], 
}

def distribute_cards():
    total_cards = [i for i in range(52) if i not in cards_to_remove[num_players]]
    cards_per_player = len(total_cards)//num_players
    random.shuffle(total_cards)
    for i,player in enumerate(players):
        cards[player] = total_cards[i*cards_per_player:(i+1)*cards_per_player]

@app.route("/startShow")
def get_players():
    return { 'players': players }

@app.route("/add", methods=['POST'])
def add_player():
    global players, ip2name, num_players
    name = request.json['name']
    ip = request.remote_addr
    players.append(name)
    ip2name[ip] = name
    num_players += 1
    print(players)
    return redirect(location='http://127.0.0.1:3000', code=200)

@app.route("/reset")
def reset_game():
    global num_players, ip2name, players, teammates, round_info, round_num, cards
    num_players = 0
    ip2name = dict()
    players = []
    teammates = []
    round_info = []
    round_num = 0
    cards = dict()

    return redirect(location='http://127.0.0.1:3000', code=200)

@app.route("/start")
def start_game():
    pass

@app.route("/startRound")
def start_round():
    pass

@app.route("/endRound")
def end_round():
    pass

@app.route("/playCard")
def play_card():
    pass

@app.route("/winner")
def find_winner():
    pass


if __name__ == '__main__':
    app.run(port=5000)