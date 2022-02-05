import React, { useState, useEffect } from "react";
import { Container, Col, Row, Image } from 'react-bootstrap';
import images from "../../components/Images/Images";
import GameObject from '../../components/GameObject/GameObject';
import axios from "axios";
import './MatchesPage.css'

async function getMatchDetails(id) {
    try {
        const res = await axios.get(`http://127.0.0.1:5000/match_details/${id}`)
        // console.log(res.data)
        return res.data
    }
    catch (error) {
        console.error(error.response.data)
    }    
}

async function getMatchIds() {
    try {
        const res = await axios.get(`http://127.0.0.1:5000/matches`)
        // console.log(res)
        return res.data.match_ids
    }
    catch (error) {
        console.error(error.response.data)
    }
}

async function getWeaponKills() {
    try {
        const res = await axios.get(`http://127.0.0.1:5000/weaponkills`)
        // console.log(res.data)
        return res.data
    }
    catch (error) {
        console.error(error.response.data)
    }
}

function MatchesPage() {
    const [matchIds, setMatchIds] = useState([])
    const [matchObjects, setMatchObjects] = useState([])
    const [weaponKills, setWeaponKills] = useState([])

    useEffect(async () => {
        const ids = await getMatchIds()
        setMatchIds(ids)
        const weapon_kills = await getWeaponKills()
        setWeaponKills(weapon_kills)


        let promises = []
        for (let i=0; i<ids.length; i++) {
            let details = await getMatchDetails(ids[i])
            promises.push(details)
        }
        Promise.all(promises).then(() => {
            setMatchObjects(promises)
        })

      }, []);


    function renderObjects(obj) {
        return (
            <GameObject details={obj} />
        )
    }
    return (
        <div>
            <br/>
            <h1 style={{ color: 'white', fontFamily: 'Rajdhani', fontWeight:'bold', fontSize:'50px' }}>Matches</h1>
            <br/>
            {/* {matchIds.map(renderIds)} */}
            <Container>
                <Row className="g-2" md={3}>                    
                    {matchObjects.map(renderObjects)}
                </Row>
            </Container>
            <br/>
            <br/>
            <Container>
                <Row style={{display: 'flex', justifyContent: 'center', alignItems:'center', color: 'white', fontFamily: 'Rajdhani'}}>
                        <h3 style={{fontSize: '50px', fontWeight: 'bold'}}>Kills by weapon for last 15 matches</h3>
                        <Row md={2} style={{overflow: 'scroll', height: '80vh', padding:'50px'}}>                      
                            {Object.entries(weaponKills)
                        .map(([key, value]) =>
                          <h4 style={{}}>
                              <Image style={{width: '55%', height: '80%', padding: '10px', margin: '10px'}} src={images[key]}/>
                              {key}: {value}
                          </h4> )}
                        </Row>
                        
                </Row>
            </Container>
        </div>
        
    )

}

export default MatchesPage;