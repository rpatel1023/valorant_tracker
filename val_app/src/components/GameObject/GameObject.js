import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './GameObject.css'


function GameObject(props) { 
    const [winner, setWinner] = useState()
    const [expanded, setExpanded] = useState(false)

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

    function roundDamage(round, index) {
        let stats = round['playerStats'][0]
        let damage = 0
        let legshots = 0
        let bodyshots = 0
        let headshots = 0
        
        if (stats['damage'].length > 0) {
            for (let hit of stats['damage']) {
                damage += hit['damage']
                legshots += hit['legshots']
                bodyshots += hit['bodyshots']
                headshots += hit['headshots']
            }
            damage = damage / (stats['damage']).length
            // console.log(damage, headshots, bodyshots, legshots)
            return (
                <>
                    <h2>Round number: {index+1}</h2>
                    <p>Average damage is {damage}</p>
                    <p>Total Headshots {headshots}</p>
                    <p>Total bodyshots {bodyshots}</p>
                    <p>Total legshots {legshots}</p>
                </>
            )
        }
        else {
            return (
                <>
                <h2>Round number: {index+1}</h2>
                <p>You did no damage this round.</p>
                </>
            )
        }
    }
    return (
        <Col style={{ minWidth: expanded ? '90%':'20%' }}>
            <div className="gameObject">
                <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <Card onClick={() => setExpanded(!expanded)} bg={winner ? 'success' : 'danger'}  style={{ minWidth: expanded ? '90%':'20%' }} text={'white'}  className="mb-2">
                    <Card.Header>{props.details['queueID']}</Card.Header>
                    <Card.Body>
                    <Card.Title>{mapRegex.exec(props.details['mapId'])}</Card.Title>
                    <Card.Text>
                        This game was <b>{winner ? 'won' : 'lost'}</b> by the user
                        {expanded ? <p>Kills: {props.details['players']['stats']['kills']} Deaths: {props.details['players']['stats']['deaths']} Assists: {props.details['players']['stats']['assists']}</p> : null}
                        {expanded ? <div>{props.details['roundResults'].map(roundDamage)}</div> : null}
                    </Card.Text>
                    </Card.Body>
                </Card>
                
                {/* <p>{props.details['gameMode']}</p> */}
                </Container>
            </div>
        </Col>
    )
}

export default GameObject;