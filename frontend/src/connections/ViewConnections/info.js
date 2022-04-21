import "../shared.css";
import React from 'react';
 
function Info (props){
    const styles = {
        border: '3px solid purple', 
        margin: '10px',
        width: '40%',
        backgroundColor: 'rgba(255, 122, 255, 0.5)',
        borderRadius: 9
    };
    return (
        <div style={styles}>
            <h3> {props.name} </h3>
            <p> Game: {props.game}</p>
            <p> Rank: {props.rank}</p>
            <p> Status: {props.status}</p>
            <p> Bio: {props.bio}</p>
        </div>
  )
}
export default Info;