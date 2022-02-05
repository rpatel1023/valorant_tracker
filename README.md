<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/rpatel1023/valorant_tracker">
    <img src="images/v_track.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Valorant Tracker</h3>

  <p align="center">
    A (in-progress) stat tracking tool to get statistics on Valorant performance!
    <br />
    <a href="https://github.com/rpatel1023/valorant_tracker/issues">Report Bug</a>
    ·
    <a href="https://github.com/rpatel1023/valorant_tracker/issues">Request Feature</a>
  </p>
</div>




<!-- ABOUT THE PROJECT -->
## About The Project

This project is my own attempt at becoming comfortable with the Valorant Client API, and keeping track of my performance as I play Valorant.


### Built With

* [React.js](https://reactjs.org/)
* [Electron.js](https://www.electronjs.org/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [valclient](https://github.com/colinhartigan/valclient.py)

<!-- GETTING STARTED -->
## Getting Started

This project is built mainly through ReactJS and Python, requiring `npm 8.x.x+` and `Python 3.7.x+`

### Usage

**Valorant must be open and running in the background for the Flask API to receive match data**

To run the Electron App, cd into `val_app` and run
* npm

  ```sh
  npm install
  npm run electron-dev
  ```
To start the Flask API, at the root directory run
* python

  ```sh
  pip install -r requirements.txt
  python ./api.py
  ````
To generate a distributable executable, cd into `val_app` and run
```sh
npm run electron-pack
```
Then, navigate to `val_app/dist` and run  `val_app Setup 0.1.0.exe` to install


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
Major credits to valclient and the valorant-api-docs, for making my life easier
* [valclient](https://github.com/colinhartigan/valclient.py)
* [valorant-api-docs](https://github.com/techchrism/valorant-api-docs)

