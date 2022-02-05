import React, { useState, useEffect } from "react";
import { Card, Modal, Container, Row, Col, Carousel, Image } from 'react-bootstrap';
import './GameObject.css'
import images from '../Images/Images'

const weapons_dict = {
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

const agents_dict = {
    "5f8d3a7f-467b-97f3-062c-13acf203c006": "Breach",
    "f94c3b30-42be-e959-889c-5aa313dba261": "Raze",
    "117ed9e3-49f3-6512-3ccf-0cada7e3823b": "Cypher",
    "ded3520f-4264-bfed-162d-b080e2abccf9": "Sova",
    "707eab51-4836-f488-046a-cda6bf494859": "Viper",
    "eb93336a-449b-9c1b-0a54-a891f7921d69": "Phoenix",
    "9f0d8ba9-4140-b941-57d3-a7ad57c6b417": "Brimstone",
    "569fdd95-4d10-43ab-ca70-79becc718b46": "Sage",
    "8e253930-4c05-31dd-1b6c-968525494517": "Omen",
    "add6443a-41bd-e414-f6ad-e58d267f4e95": "Jett",
    "6f2a04ca-43e0-be17-7f36-b3908627744d": "Skye",
    "7f94d92c-4234-0a36-9646-3a87eb8b5c89": "Yoru",
    "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc": "Reyna",
    "601dbbe7-43ce-be57-2a40-4abd24953621": "Kay/O",
    "1e58de9c-4950-5125-93e9-a0aee9f98746": "Killjoy",
    "41fb69c1-4189-7b37-f117-bcaf1e96f1bf": "Astra"
}

const maps_dict = {
    "Ascent": "ASCENT",
    "Duality": "BIND",
    "Foxtrot": "BREEZE",
    "Canyon": "FRACTURE",
    "Triad": "HAVEN",
    "Port": "ICEBOX",
    "Bonsai": "SPLIT"
}

function GameObject(props) { 
    const [winner, setWinner] = useState()
    const [agent, setAgent] = useState()
    const [modal, setModal] = useState(false)
    const [map, setMap] = useState()

    useEffect(() => {
        let game_winner = isWinner(props.details['teams'], props.details['players']['teamId'])
        let game_agent = agents_dict[props.details['players']['characterId']]
        const mapRegex = new RegExp("[^\/]+$");
        const map_name = mapRegex.exec(props.details['mapId'])
        setMap(map_name)
        setAgent(game_agent)
        setWinner(game_winner)
    }, []);

    function isWinner(teams, userTeam) {
        let winner = false
        for (let i=0; i<teams.length; i++) {
            if (teams[i]['won'] == true && teams[i]['teamId'] == userTeam) {
                return true
            }
        }
        return winner
    }

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
                    <h4>Damage:</h4>
                    <p>Average damage: {damage}</p>
                    <p>Total headshots: {headshots}</p>
                    <p>Total bodyshots: {bodyshots}</p>
                    <p>Total legshots: {legshots}</p>
                </>
            )
        }
        else {
            return (
                <>
                    <h4>Damage:</h4>
                    <p>You did no damage this round.</p>
                </>
            )
        }
    }

    function printKills(kill) {
        return (
            <>
            <Col>
                <p>{kill[0]}</p>
                <Image src={images[kill[0]]} style={{width: '20%', margin: '10px'}} />
                <p>x: {kill[1]}</p>
                <p>y: {kill[2]}</p>
                <br/>

            </Col>
            </>
        )
    }

    function roundKills(round, index) {
        let stats = round['playerStats'][0] 
        let kills = []
        if (stats['kills'].length > 0) {
            for (let kill of stats['kills']) {
                let weapon = kill['finishingDamage']['damageItem']
                if (weapon === "") {
                    weapon = "Bomb"
                }
                else if (weapon === "GrenadeAbility") {
                    weapon = "Ability"
                }
                else {
                    weapon = weapons_dict[weapon]
                }
                let x_cord = kill['victimLocation']['x']
                let y_cord = kill['victimLocation']['y']
                kills.push([weapon, x_cord, y_cord])
            }
        }
        if (kills.length > 0) {
            return (
                <>
                    <h4 style={{fontSize:'25px'}}>Kills:</h4>
                    <Row md={2} style={{fontSize:'25px'}}>
                        {kills.map(printKills)}
                    </Row>
                </>
            )
        }
        else {
            return (
                <>
                    <h4>Kills:</h4>
                    <p style={{fontSize:'45px'}}>You had no kills this round.</p>
                </>
            )
        }
        return 
    }

    function mapRounds(round, index) {
        return (
            <Carousel.Item>
                <Row>
                    <h2>Round {index+1}</h2>
                    <Col style={{alignItems: 'center', fontFamily: 'Barlow Condensed', fontSize: '45px'}}>
                        {roundDamage(round, index)}
                    </Col>
                    <Col style={{justifyContent: 'center', height: "60vh", overflow: 'scroll', overflowX:'hidden', marginRight: '-10px', fontFamily: 'Barlow Condensed'}}>
                        {roundKills(round, index)}
                    </Col>
                </Row>
            </Carousel.Item>
        )
    }

    const updateModal = () => {
        setModal(!modal);
    } 

    return (
        <>
        <Col style={{ minWidth: '33%' }}>
            <div className="gameObject">
                <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems:'center', fontFamily: 'Abel'}}>
                    <Image src={images[map]}/>
                    <Card onClick={updateModal} bg={'dark'} border = {winner ? 'success' : 'danger'} text={'white'} style={{width: "100%", borderColor: winner ? 'green' : 'red', borderWidth: '4px'}} className="shadow-lg mb-2 border-thick">
                        <Card.Header>{props.details['queueID']}</Card.Header>
                        <Card.Body>
                        <Card.Title>{maps_dict[map]}</Card.Title>
                        <Card.Text>
                            This game was <b>{winner ? 'won' : 'lost'}</b> by the user
                        </Card.Text>
                        </Card.Body>
                    </Card>          
                </Container>
            </div>
        </Col>
        <Modal centered dialogClassName='modal-90w'show={modal} onHide={() => setModal(false)}>
            <Modal.Header closeButton style={{ backgroundColor: '#DC3D4B', color: 'white'}}>
                <Modal.Title>
                    <h1 style={{alignSelf: 'center'}}>{maps_dict[map]} - {agent} <Image style={{width: '10%' }}src={images[agent]}/></h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#DC3D4B', color: 'white'}}>
                <Carousel interval={null} style={{ minHeight: "60vh", margin: 'auto'}}>
                    {props.details['roundResults'].map(mapRounds)}
                </Carousel>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default GameObject;