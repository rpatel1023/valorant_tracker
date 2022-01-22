from valclient import Client
from match import deconstructMatch, getAverageRoundDamage, getAverageRoundKills

client = Client(region="na")
client.activate()


matches = client.fetch_match_history()
matches = matches["History"]
match_ids = []
for match in matches:
    match_ids.append(match['MatchID'])

subject_id = client.fetch_account_xp()['Subject']


current_match = client.fetch_match_details(match_id=match_ids[4])
# print(current_match)
updated_match = deconstructMatch(current_match, subject_id)

for round in updated_match['roundResults']:
    round_num = str(round['roundNum'] + 1)
    print(f"Round Damage Stats for Round {round_num}")
    getAverageRoundDamage(round)
    print(f"Kills Achieved in Round {round_num}")
    getAverageRoundKills(round)
# print(updated_match)



