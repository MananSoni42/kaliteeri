import json

cards = {
    0: {   
        'suit': 0,
        'value': 0,
        'img': '/cards/blank.png'
    },
}

ind = 1
suits = {
    1: 'hearts',
    2: 'spades',
    3: 'diamonds',
    4: 'clubs'
}

def points(i):
    if i%13 in [1,10,11,12,13]:
        return 10
    elif i%13 == 5:
        return 5
    elif i == 13+3:
        return 30
    return 0

for i in range(52):
    cards[i+1] = {
        'suit': 1 + i//13,
        'value': points(i+1),
        'img': f'/cards/row-{1 + i//13}-column-{1+i%13}.png'
    }

with open('cards.json','w') as f:
    json.dump(cards,f,indent=2)

