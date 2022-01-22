import tkinter as tk
from valclient import Client
from PIL import ImageTk, Image
from match import deconstructMatch, getAverageRoundKills, getAverageRoundDamage

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

# for round in updated_match['roundResults']:
#     round_num = str(round['roundNum'] + 1)
#     print(f"Round Damage Stats for Round {round_num}")
#     getAverageRoundDamage(round)
#     print(f"Kills Achieved in Round {round_num}")
#     getAverageRoundKills(round)
# # print(updated_match)


#This creates the main window of an application
window = tk.Tk()
window.title("kill tracker")
# window.geometry("300x300")
window.configure(background='blue')

res = getAverageRoundKills(updated_match['roundResults'][0])
print(res)
path = f"./resources/{res[0]}.png"

#Creates a Tkinter-compatible photo image, which can be used everywhere Tkinter expects an image object.
img = ImageTk.PhotoImage(Image.open(path))

#The Label widget is a standard Tkinter widget used to display a text or image on the screen.
panel = tk.Label(window, image = img)
label = tk.Label(window, text=f'kill at x:{res[1]}, y:{res[2]}')
label.pack(ipadx=10, ipady=10)


#The Pack geometry manager packs widgets in rows or colu    mns.
panel.pack(side = "bottom", fill = "both", expand = "yes")

#Start the GUI
window.mainloop()