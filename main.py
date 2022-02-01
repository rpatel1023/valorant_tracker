from collections import Counter
from valclient import Client
from match import deconstructMatch, getTotalMatchKills
import json
import os
import shutil

client = Client(region="na")
client.activate()

matches = client.fetch_match_history()
matches = matches["History"]
ids_file = open("matchids.txt", "w")

# fetch match ids from valclient and save
print("Writing match ids...")
for match in matches:
    ids_file.write(match['MatchID'] + "\n")
ids_file.close()


def getMatchIDs():
    ids_file = open("matchids.txt", "r")
    id_list = {"match_ids": []}
    lines = ids_file.readlines()
    id_list['match_ids'] = [line.strip() for line in lines]
    ids_file.close()
    return id_list

def getSubjectID():
    subject_id = client.fetch_account_xp()['Subject']
    return subject_id

def getMatchDetails(match_id):
    with open(f'./matches/{match_id}.json') as file:
        data = file.read()
        obj = json.loads(data)
    file.close()
    return obj

# def getSimplifiedMatchDetails(match_id):
#     with open(f'./matches/{match_id}.json') as file:
#         data = file.read()
#         obj = json.loads(data)
#     file.close()
#     simple_match = simplifiedMatchStats(obj)
#     return simple_match

def getAggregateWeaponKills():
    match_list = getMatchIDs()
    kills = {'kills': []}
    for match_id in match_list['match_ids']:
        match_data = getMatchDetails(match_id)
        kills['kills'].append(getTotalMatchKills(match_data))
    mylist = kills['kills']
    mylist = sum(mylist, [])
    return Counter(mylist)


shutil.rmtree('./matches')
os.mkdir('./matches')
subject_id = getSubjectID()
ids = getMatchIDs()
match_ids = ids['match_ids']
print("Generating match jsons...")
for match in match_ids:
    match_details = client.fetch_match_details(match_id=match)
    updated_match = deconstructMatch(match_details, subject_id)
    with open(f'./matches/{match}.json', 'w', encoding='utf-8') as f:
        json.dump(updated_match, f)
    f.close()

        

# id_list = getMatchIDs()

# for match in id_list['match_ids']:
#     current_match = client.fetch_match_details(match_id=match)
#     updated_match = deconstructMatch(current_match, subject_id)
#     print(f"match data for match id: {match}")
#     for round in updated_match['roundResults']:
#         round_num = str(round['roundNum'] + 1)
#         print(f"Round Damage Stats for Round {round_num}")
#         getAverageRoundDamage(round)
#         print(f"Kills Achieved in Round {round_num}")
#         getAverageRoundKills(round)





# current_match = client.fetch_match_details(match_id=id_list[4])
# print(current_match)
# updated_match = deconstructMatch(current_match, subject_id)

# for round in updated_match['roundResults']:
#     round_num = str(round['roundNum'] + 1)
#     print(f"Round Damage Stats for Round {round_num}")
#     getAverageRoundDamage(round)
#     print(f"Kills Achieved in Round {round_num}")
#     getAverageRoundKills(round)




