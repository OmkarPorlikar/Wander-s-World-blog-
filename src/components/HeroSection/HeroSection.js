import React from 'react';
import '../../App.css';
import { Button } from '../Button/Button';
import './HeroSection.css';
import useValidateUser from '../../Hooks/useValidateUser';


function HeroSection() {
    return(
        <div className='hero-container'>
            <video src="/videos/video-1.mp4" autoPlay loop muted />
            <h1>Wanderer's Words</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
                <Button 
                    className='btns' 
                    buttonStyle='btn--outline' 
                    buttonSize='btn--large'
                >GET STARTED</Button>
            </div>
        </div>
    );
}


export default HeroSection;