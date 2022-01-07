import React, { useState, useEffect } from 'react';
import Card from './Card.js';

function Player({name,color,card,info,turn,pt=(0,0)}) {
    if (info) {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <img src={`/user/user-${color}.png`} alt={`user-${name}`} className="img-fluid"/>
                        <div className="fs-5"> {name} </div>
                        <div className="fs-7"> Haath:  {pt[0]}</div>
                        <div className="fs-7"> Points: {pt[1]}</div>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-12 border border-3 ${turn?'border-dark':'border-primary'}`}>
                        <Card num={card?card:0}></Card>
                    </div>
                </div>
            </div>
            );        
    } else {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <img src={`/user/user-${color}.png`} alt="name" className="img-fluid"/> 
                        <div className="fs-5"> {name} </div>
                    </div>
                </div>
            </div>
            );        
    }
}
export default Player;