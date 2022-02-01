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

async function getSubjectId() {
    try {
        const res = await axios.get(`/subject`)
        // console.log(res)
        return res.data.subject
    }
    catch (error) {
        console.error(error.response.data)
    }
}


function MatchesPage() {
    const [matchIds, setMatchIds] = useState([])
    const [matchObjects, setMatchObjects] = useState([])
    const [subjectId, setSubjectId] = useState([])

    useEffect(async () => {
        const ids = await getMatchIds()
        setMatchIds(ids)

        const subject_id = await getSubjectId()
        setSubjectId(subject_id)

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
            <Col>
                <GameObject details={obj} />
            </Col>
        )
    }
    return (
        <div>
            <h1>matches page</h1>
            {/* {matchIds.map(renderIds)} */}
            <Container>
                <Row>
                    {matchObjects.map(renderObjects)}
                </Row>
            </Container>
        </div>
        
    )

}

export default MatchesPage;