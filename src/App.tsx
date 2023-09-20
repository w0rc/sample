import { useState, KeyboardEvent, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

import RubikCube from './RubikCube';
import Controller from './Controller';
import { ControllerHandle, CubeHandle, CubeMode } from './Types';

import './App.css';

function App() {
    // canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // rubikcube and controller
    const rubikcubeRef = useRef<CubeHandle>(null);
    const controllerRef = useRef<ControllerHandle>(null);
    const handleKeyDown = ( e: KeyboardEvent ) => {
        if( rubikcubeRef.current ) rubikcubeRef.current.onKeyDown( e.key );
    };
    const handleKeyUp = ( e: KeyboardEvent ) => {
        if( rubikcubeRef.current ) rubikcubeRef.current.onKeyUp( e.key );
    };
    const [speed, setSpeed] = useState(4);
    const [history, setHistory] = useState("");
    const onRotationFinished = ( symbol: string ) => {
        setHistory( history+" "+symbol );
    };
    const onOrderFinished = () => {
        controllerRef.current?.resetConsoles();
    }
    
    return (
        <div className="App">
            {/*
            <div>
                <label>Click RubikCube! You can control the RubikCube with keyboard.</label>
            </div>
            -->
            */}
            <div className="Canvas-Container">
                <Canvas
                    className="Canvas"
                    tabIndex={0}
                    onKeyDown={ handleKeyDown }
                    onKeyUp={ handleKeyUp }
                    camera={{position: new Vector3(4, 3.5, 5)}}
                    ref={ canvasRef }>
                    {/* initialize */}
                    <OrbitControls />
                    <ambientLight intensity={1.0} />
                    {/* <spotLight  position={[  10,  10,  10 ]} angle={0.15} intensity={0.8}/> */}
                    {/* <pointLight position={[  10,  10,  10 ]} intensity={0.8}/> */}
                    <directionalLight position={[  10,  10,  10 ]} intensity={0.8}/>
                    <directionalLight position={[ -10, -10, -10 ]} intensity={0.8}/>
                    <directionalLight position={[  10,  10,  10 ]} intensity={0.4}/>
                    <directionalLight position={[  10, -10,  10 ]} intensity={0.4}/>

                    {/* helper */}
                    <axesHelper args={[3]} />
                    <gridHelper args={[20, 20]} position={[   0,  -3,   0]} />
                    <gridHelper args={[20, 20]} position={[   0,   7, -10]} rotation={[Math.PI / 2, 0, 0]} />
                    <gridHelper args={[20, 20]} position={[ -10,   7,   0]} rotation={[0, 0, Math.PI / 2]} />
                    {/* RubikCube */}
                    <RubikCube
                        position={ new Vector3( 0, 0, 0 ) }
                        moveSpeed={ speed }
                        onRotationFinished={ onRotationFinished }
                        onOrderFinished={ onOrderFinished }
                        ref={ rubikcubeRef }
                    />
                </Canvas>
            </div>
            {/* Console */}
            <Controller
                moveSpeed={speed}
                requestSetSpeed={( speed: number ) => setSpeed( speed ) }
                requestModeChange={( mode: CubeMode ) => {
                    rubikcubeRef.current?.setCubeMode( mode );
                }}
                requestOrder={(symbols: string) => {
                    rubikcubeRef.current?.requestOrder( ...symbols.split(" ") );
                }}
                requestReverse={() => {
                    rubikcubeRef.current?.requestReverse();
                }}
                history={rubikcubeRef.current?.history.join(" ")}
                ref={ controllerRef }
            />
            
            {/*
            <div className="develop">
                <label>{ }</label>
            </div>
            */}
        </div>
    );
}

export default App;
