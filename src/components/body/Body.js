import './Body.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeBody() {
    const navigate = useNavigate();

    const goToNewPage = () => {
        navigate('/quiz');
    };

    return (
        <center className='canvas'>
            <h1 className='title'>
                ENEM
                <br></br>
                QUIZ
            </h1>
            <button className="playBtn" onClick={goToNewPage}>
                <h1>JOGAR</h1>
            </button>
        </center>
    );
}

export default HomeBody;