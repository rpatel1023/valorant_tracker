

from tkinter.constants import Y


list_of_keys = ['matchId', 'mapId', 'queueId', 'isRanked', 'seasonId', 'teams', 'roundResults', 'queueID', 'gameMode']
weapons_dict = {
    "29A0CFAB-485B-F5D5-779A-B59F85E204A8": "Classic",
    "42DA8CCC-40D5-AFFC-BEEC-15AA47B42EDA": "Shorty",
    "44D4E95C-4157-0037-81B2-17841BF2E8E3": "Frenzy",
    "1BAA85B4-4C70-1284-64BB-6481DFC3BB4E": "Ghost",
    "E336C6B8-418D-9340-D77F-7A9E4CFE0702": "Sheriff",
    "F7E1B454-4AD4-1063-EC0A-159E56B58941": "Stinger",
    "462080D1-4035-2937-7C09-27AA2A5C27A7": "Spectre",
    "AE3DE142-4D85-2547-DD26-4E90BED35CF7": "Bulldog",
    "4ADE7FAA-4CF1-8376-95EF-39884480959B": "Guardian",
    "EE8E8D15-496B-07AC-E5F6-8FAE5D4C7B1A": "Phantom",
    "9C82E19D-4575-0200-1A81-3EACF00CF872": "Vandal",
    "910BE174-449B-C412-AB22-D0873436B21B": "Bucky",
    "EC845BF4-4F79-DDDA-A3DA-0DB3774B2794": "Judge",
    "55D8A0F4-4274-CA67-FE2C-06AB45EFDF58": "Ares",
    "63E6C2B6-4A8E-869C-3D4C-E38355226584": "Odin",
    "C4883E50-4494-202C-3EC3-6B8A9284F00B": "Marshal",
    "A03B24D3-4319-996D-0F8C-94BBFBA1DFC7": "Operator",
    "2F59173C-4BED-B6C3-2191-DEA9B58BE9C7": "Tactical Knife"
}
class Match:
    def __init__(self, id):
        self.id = id


def deconstructMatch(match, subject):
    d_match = {}
    for key in match['matchInfo']:
        if key in list_of_keys and key not in d_match:
            d_match[key] = match['matchInfo'][key]
    d_match.update({'teams': match['teams']})
    d_match.update({'roundResults': match['roundResults']})
    for round in d_match['roundResults']:
        try:
            del round['playerScores']
            del round['playerEconomies']
            
        except KeyError:
            pass
        
        for player in list(round['playerStats']):
            if player['subject'] != subject:
                round['playerStats'].remove(player)

    for player in match['players']:
        if player['subject'] == subject:
            d_match.update({'players': player})
    
    try:
        del d_match['players']['behaviorFactors']
        del d_match['players']['newPlayerExperienceDetails']
    except KeyError:
        pass



    return d_match



def getAverageRoundDamage(round):
    stats = round['playerStats'][0]
    damage = 0
    legshots = 0
    bodyshots = 0
    headshots = 0
    if len(stats['damage']) > 0:
        for hit in stats['damage']:
            damage += hit['damage']
            legshots += hit['legshots']
            bodyshots += hit['bodyshots']
            headshots += hit['headshots']
        damage = damage / len(stats['damage'])
        print("Average Damage is: " + str(damage))
        print("Total Legshots: " + str(legshots))
        print("Total Bodyshots: " + str(bodyshots))
        print("Total Headshots: " + str(headshots))
    else: 
        print("u hit nobody lol trash")
    # print(stats)

def getAverageRoundKills(round):
    stats = round['playerStats'][0]
    res = []
    if len(stats['kills']) > 0:
        for kill in stats['kills']:
            x_cord = kill['victimLocation']['x']
            y_cord = kill['victimLocation']['y']
            weapon = weapons_dict[kill['finishingDamage']['damageItem']]
            print(f'Killed player at x:{x_cord}, y:{y_cord} using {weapon}')
            res = [weapon, x_cord, y_cord]
            return res
    else:
        print("lol u didn't kill any1 trash")     
        return res
