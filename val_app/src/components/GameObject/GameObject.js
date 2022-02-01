import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './GameObject.css'


function GameObject(props) { 
    const [winner, setWinner] = useState()

    useEffect(() => {
        let game_winner = isWinner(props.details['teams'], props.details['players']['teamId'])
        setWinner(game_winner)
    });

    function isWinner(teams, userTeam) {
        let winner = false
        for (let i=0; i<teams.length; i++) {
            if (teams[i]['won'] == true && teams[i]['teamId'] == userTeam) {
                return true
            }
        }
        return winner
    }
    const mapRegex = new RegExp("[^\/]+$");
    return (
        <div className="gameObject">
            <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
            <Card onClick={() => alert("hello")} bg={winner ? 'success' : 'danger'} text={'white'} style={{ width: '18rem' }} className="mb-2">
                <Card.Header>{props.details['queueID']}</Card.Header>
                <Card.Body>
                <Card.Title>{mapRegex.exec(props.details['mapId'])}</Card.Title>
                <Card.Text>
                    This game was <b>{winner ? 'won' : 'lost'}</b> by the user
                </Card.Text>
                </Card.Body>
            </Card>
            
            {/* <p>{props.details['gameMode']}</p> */}
            </Container>
        </div>
    )
}

export default GameObject;