from flask import Flask
from flask_cors import CORS
from main import getMatchDetails, getMatchIDs, getSubjectID
app = Flask(__name__)
CORS(app)

@app.get("/")
def hello():
    return {'result': 'hello world'}

@app.get("/matches")
def get_matches():
    return getMatchIDs()

@app.get("/subject")
def get_subject_id():
    return { 'subject' : getSubjectID() }

@app.get("/match_details/<match_id>")
def get_match_details(match_id):
    return getMatchDetails(match_id)

if __name__ == '__main__':
    app.run()