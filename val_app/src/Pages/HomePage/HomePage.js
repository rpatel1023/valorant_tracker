import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './HomePage.css'


function HomePage() {
    return (
        <div> 
            <h1>home page</h1>
            <Link to='/tracker' className='btn btn-primary'>Tracker</Link>
        </div>
        
    )
}

export default HomePage;