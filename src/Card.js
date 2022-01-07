import React from 'react';
const cardMap = require('./cards.json');

function Card({num,sc,csc,dis}) {
    return (
        <div className={`p-1 m-1 ${csc==num?'border border-3 border-dark':''}`}>
            <img className={`img-fluid ${dis?'opacity-50':'card'}`} src={cardMap[num]['img']} alt={`Card-${num}`} onClick={() => { 
                if (!dis) {
                    sc(num); 
                }
            }}/> 
        </div>
    );
}

export default Card;
