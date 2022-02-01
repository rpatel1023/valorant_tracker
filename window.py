from logging import root
import tkinter as tk
from valclient import Client
from PIL import ImageTk, Image
from match import deconstructMatch, getAverageRoundKills, getAverageRoundDamage
from main import *

global match_ids

def hello():
    match_ids = getMatchIDs()

def app():
    global root
    root = tk.Tk()

    root.title("Valorant Tracker")
    root.geometry("530x300+1300+290")
    root.configure(bg="#dc3d4b")

    #options
    option1= tk.Label(root, text="Get Data for Match")
    option1.configure(bg="#dc3d4b", fg="white", font=("Open Sans", 14), pady=4)
    option1.grid(row=1,column=3)

    #buttons
    dataButton = tk.Button(root, text='Get Data', command=hello)
    dataButton.configure(bg="white", fg="black", font=("Open Sans", 14), pady=4)
    dataButton.grid(row=3, column=3)
    root.mainloop()


if __name__ == "__main__":
    app()