'use client'

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import Tooltip from '../../components/tooltip.js';
import graphData from '../graphData.json';


const ForceGraph3D = dynamic(() => import('react-force-graph').then(module => module.ForceGraph3D), { ssr: false });

export default function Home() {
  const [clickedNode, setClickedNode] = useState(null);
  const [animationPaused, setAnimationPaused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleNodeClick = (node) => {
    if (clickedNode === node) {   
      // If the clicked node is the same as the current clicked node, hide the tooltip
      setShowTooltip(false);
    } else {
      // Otherwise, show the tooltip for the new node
      setShowTooltip(true);
      setClickedNode(node);
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       {clickedNode && <Tooltip node={clickedNode}/>}
       <div className="graph-container">
      <ForceGraph3D 
        graphData={graphData}
        nodeThreeObject={(node) => {
          let color;
          switch(node.position) {
            case 'initial asset': color = '#00A3FF'; break;
            case 'Entry': color = '#FFDAB9'; break;
            case 'Exit': color = '#F68370'; break;
        }

        // if (node === clickedNode) {
        //   color = 'red';
        // }

        // Determine size of the node based on avgGasCostEntry or avgGasCostExit.
        // Meowww404 makes sure to multiply a constant to make the size difference visible.
        const sizeMultiplier = 7;
        let size = 1;
        if (node['avgGasCostEntry']) {
          size = node['avgGasCostEntry'] * sizeMultiplier;
        } else if (node['avgGasCostExit']) {
          size = node['avgGasCostExit'] * sizeMultiplier;
        }

        const geometry = new THREE.SphereGeometry(size, 16, 12); 
        const material = new THREE.MeshStandardMaterial({ 
          color: color,
          roughness: 0.9,
          lightMap: null,
          lightMapIntensity: 1,
          emissiveIntensity: 1,
          emissiveMap: null,
        });
        return new THREE.Mesh(geometry, material);
      }}
        linkDirectionalArrowLength={10}
        linkDirectionalArrowRelPos={1}
        nodeLabel={node => `<span style="color: purple; font-size: 12px;">${node.id}</span>`}
        linkOpacity={1}
        linkCurvature={0.01}
        linkWidth={0.8}
        linkColor={link => link.color || 'black'}
        backgroundColor={'white'}
        onNodeClick={handleNodeClick}
        enablePointerInteraction={!animationPaused} // Disable pointer interaction when animation is paused
      />
      </div>
    </main>
  );
};




