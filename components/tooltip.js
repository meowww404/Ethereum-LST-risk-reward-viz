import React from 'react';

export default function Tooltip({node}) {


  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1,
        bottom: '-5%',
        left: '50%',
        transform: 'translate(-40%, -50%)',
        background: 'white',
        color: 'black',
        padding: '2vw',
        borderRadius: 5,
        fontSize: '12px',
        pointerEvents: 'none',
      }}
    >
      <strong>{node.id}</strong>
      {node.position && <p>Position: {node.position}</p>} 

      {node.avgAPR && <p>Avg. APR: {node.avgAPR}</p>} 

      {node.avgGasCostEntry && <p>Avg. Gas Cost for Entry Position (ETH): {node.avgGasCostEntry}</p>}

      {node.avgGasCostExit && <p>Avg. Gas Cost for Exit Position (ETH): {node.avgGasCostExit}</p>}
    </div>
  );
}

//conditional rendering in react. 
//check if node.avgAPR is truthy, if the expression is evaluated to true and display the elements after &&
