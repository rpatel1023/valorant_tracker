import React, { useState, useEffect } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import axios from "axios";
import GameObject from '../../components/GameObject/GameObject';
import './MatchesPage.css'

async function getMatchDetails(id) {
    try {
        const res = await axios.get(`/match_details/${id}`)
        // console.log(res.data)
        return res.data
    }
    catch (error) {
        console.error(error.response.data)
    }    
}

async function getMatchIds() {
    try {
        const res = await axios.get(`/matches`)
        // console.log(res)
        return res.data.match_ids
    }
    catch (error) {
        console.error(error.response.data)
    }
}

async function getWeaponKills() {
    try {
        const res = await axios.get(`/weaponkills`)
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
            <h1>matches page</h1>
            {/* {matchIds.map(renderIds)} */}
            <Container>
                <Row>                    
                    {matchObjects.map(renderObjects)}
                    {/* <h3>Kills by weapon for last 15 matches</h3>
                    {Object.entries(weaponKills)
                .map(([key, value]) => <p>{key}: {value}</p>)} */}

                </Row>
            </Container>
        </div>
        
    )

}

export default MatchesPage;