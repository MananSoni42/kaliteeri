import random

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

def distribute_cards(players, cards):
    num_players = len(players)
    total_cards = [i for i in range(1,52+1) if i not in cards_to_remove[num_players]]
    cards_per_player = len(total_cards)//num_players
    random.shuffle(total_cards)
    for i,player in enumerate(players):
        cards[player] = total_cards[i*cards_per_player:(i+1)*cards_per_player]

def points(card):
    if card == 0:
        return 0
    if card%13 in [1,10,11,12,0]:
        return 10
    elif card%13 == 5:
        return 5
    elif card == 13+3:
        return 30
    return 0

def better(card1, card2, trump):
    '''
    returns True if card2 is better than card1
    Assumes that card1 is played before card2
    '''
    card1 = int(card1)
    card2 = int(card2)
    trump = int(trump)
    suit1 = 1 + (card1-1)//13
    suit2 = 1 + (card2-1)//13
    val1 = 1+(card1-1)%13
    val1 = 14 if val1 == 1 else val1
    val2 = 1+(card2-1)%13
    val2 = 14 if val2 == 1 else val2

    if suit1 == suit2:
        return val2 > val1
    elif suit2 == trump:
        return True
    else:
        return False

def process_round(offset, cards, trump):
    n = len(cards)
    p = 0
    hcard,winner = cards[offset], offset
    for i in range(n):
        ind = (i+offset)%n
        p += points(cards[ind])
        if better(hcard, cards[ind], trump):
            hcard = cards[ind]
            winner = ind
    return winner, p

def calc_winners(cards, players, tcards, player_points, bidder):
    teammates = []
    non_teammates = []
    for player in players:
        for card in cards[player]:
            if card in tcards or player == bidder:
                teammates.append(player)
                break
        else:
            non_teammates.append(player)
    
    pts = 0
    for ind,player in enumerate(players):
        if player in teammates:
            pts += player_points[ind][1]

    return teammates, non_teammates, pts
