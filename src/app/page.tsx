'use client'

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

const ForceGraph3D = dynamic(() => import('react-force-graph').then(module => module.ForceGraph3D), { ssr: false });

export default function Home() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animationPaused, setAnimationPaused] = useState(false);

  const handleNodeClick = (node) => {
    if (node) {
      setHoveredNode(node);
      setAnimationPaused(true); // Pause animation when hovering over a node
    }
  };

  const handleResumeAnimation = () => {
    setAnimationPaused(false); // Resume animation
    setHoveredNode(null); // Hide tooltip
  };

  const graphData = {
    nodes: [
      { 
        id: 'LSD Strategy #1', 
        avgAPR: '+12.21% annually',
        avgGasCostEntry: '0.13ETH',
        avgGasCostExit: '0.11ETH'
      },
      { 
        id: 'LSD Strategy #2', 
        avgAPR: '+10.35% annually',
        avgGasCostEntry: '0.15ETH',
        avgGasCostExit: '0.13ETH'
      },
      { 
        id: 'LSD Strategy #3', 
        avgAPR: '+14.70% annually',
        avgGasCostEntry: '0.12ETH',
        avgGasCostExit: '0.10ETH'
      }
    ],
    links: [
      { source: 'LSD Strategy #1', target: 'LSD Strategy #2' },
      { source: 'LSD Strategy #2', target: 'LSD Strategy #3' }
    ]
  };
  
  // useEffect(() => {
  //   setTooltipNode(hoveredNode); // Update tooltipNode when hoveredNode changes
  // }, [hoveredNode]);

  // // useEffect(() => {
  // //   const handleMouseMove = (event) => {
  // //     if (hoveredNode) {
  // //       setTooltipPosition({ x: event.clientX, y: event.clientY });
  // //     }
  // //   };
  
  // //   document.addEventListener('mousemove', handleMouseMove);
  
  // //   return () => {
  // //     document.removeEventListener('mousemove', handleMouseMove);
  // //   };
  // // }, [hoveredNode]);

 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1,
            top: '50%',
            left: '35%',
            transform: 'translate(95%, -50%)',
            background: 'darkgrey',
            color: 'black',
            padding: '5vw',
            borderRadius: 5,
            fontSize: '15px',
            pointerEvents: 'none', // Disable pointer events on tooltip to prevent interference
          }}
        >
    <strong>{hoveredNode.id}</strong>
    <p>Avg. APR: {hoveredNode.avgAPR}</p>
    <p>Avg. Gas Cost for Entry Position: {hoveredNode.avgGasCostEntry}</p>
    <p>Avg. Gas Cost for Exit Position: {hoveredNode.avgGasCostExit}</p>

  </div>
)}
      <ForceGraph3D 
        graphData={graphData}
        nodeThreeObject={(node) => {
          const geometry = new THREE.SphereGeometry(4, 16, 12); 
          const material = new THREE.MeshStandardMaterial({ 
            color: node === hoveredNode ? 'red' : 'salmon',
            roughness: 0.5,
            lightMap: null,
            lightMapIntensity: 1,
            emissiveIntensity: 1,
            emissiveMap: null,
          });
          return new THREE.Mesh(geometry, material);
        }}
        linkDirectionalArrowLength={5.5}
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowColor={'black'}
        linkOpacity={1}
        linkCurvature={0.1}
        backgroundColor={'lightgrey'}
        onNodeClick={handleNodeClick}
        enablePointerInteraction={!animationPaused} // Disable pointer interaction when animation is paused
      />
    
      
        <button
          onClick={handleResumeAnimation}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
        }}
      >
        {animationPaused ? 'Reset' : 'Animation Running'}
      </button>
      <div class="position: absolute"> Click on one of the nodes to see information. Click reset before clicking another node. Zoom in/out or drag to rotate the axis.</div>
    </main>
  );
}
