import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Vector2, Raycaster, Object3D, Group, BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

import XorShift from './XorShift';
import RotationSymbols from './RotationSymbols';
import { CubeHandle, CubeProperties, CubeMode, CubeRotateStates, IntersectObject } from './Types';

/**
 * ルービックキューブ with react-three-fiber
*/
const RubikCube = forwardRef<CubeHandle, CubeProperties>(
function RubikCube( props, ref ) {
    // 共通
    const rotationSymbols = new RotationSymbols();
    const rand = new XorShift(new Date().valueOf());
    // ルービックキューブ
    const rubikCubeGroupRef = useRef<Group>( null );
    const rotationGroupRef = useRef<Group>( null );
    const cubeModeRef = useRef<CubeMode>("manual");
    // 回転操作・描画制御
    const rotateStatesRef = useRef<CubeRotateStates>({
        isRotation: false,
        rotateSymbol: "",
        symbolVector: new Vector3(),
        currentAngle: 0,
        targetAngle: 0,
        rotateAxis: new Vector3(),
        history: [],
        rotateQueue: [],
    });
    // マウスオーバ制御
    const raycaster = new Raycaster();
    const intersectObjectRef = useRef<IntersectObject>({
        mesh: null,
        tempMaterial: null
    });

    // ルービックキューブの構築
    const { scene } = useThree( );
    useEffect( () => {
        const group = rubikCubeGroupRef.current;
        if( group ){
            if( group.name !== "" ){
                return; // 初期化済み
            }else{
                group.name = "RubikCubeGroup";
                // キューブをグループに追加
                const materials = [
                    new MeshStandardMaterial({ color: 0xCC3333, roughness: 0.3, opacity: 0.8, transparent: true }), //R:red
                    new MeshStandardMaterial({ color: 0xCC6633, roughness: 0.3, opacity: 0.8, transparent: true }), //L:orange
                    new MeshStandardMaterial({ color: 0xCCCCCC, roughness: 0.3, opacity: 0.8, transparent: true }), //U:white
                    new MeshStandardMaterial({ color: 0xCCCC66, roughness: 0.3, opacity: 0.8, transparent: true }), //D:yellow
                    new MeshStandardMaterial({ color: 0x33CC33, roughness: 0.3, opacity: 0.8, transparent: true }), //F:green
                    new MeshStandardMaterial({ color: 0x3333CC, roughness: 0.3, opacity: 0.8, transparent: true }), //B:blue
                ];
                const dim = 3, offset = -1, cubeMargin = 1.01;
                for( let i=0; i<dim; i++ ){
                    for( let j=0; j<dim; j++ ){
                        for( let k=0; k<dim; k++ ){
                            const cube = new Mesh(
                                new BoxGeometry( 1, 1, 1 ),
                                materials );
                            cube.position.set(
                                (i+offset)*cubeMargin+props.position.x,
                                (j+offset)*cubeMargin+props.position.y,
                                (k+offset)*cubeMargin+props.position.z );
                            rubikCubeGroupRef.current.attach( cube );
                        }
                    }
                }
            }
        }
    }, [ scene, props ]);

    // レンダリング処理
    useFrame( ( state, delta ) => {
        const group = rubikCubeGroupRef.current;
        const stats = rotateStatesRef.current;
        const currentIntersect = intersectObjectRef.current;
        // マウスポインタのレイキャストと交差するキューブを取得する
        if ( group && currentIntersect ){
            raycaster.setFromCamera(
                new Vector2( state.mouse.x, state.mouse.y ),
                state.camera );
            const intersectCubes = raycaster.intersectObjects( group.children, false );
            // ポインタと交差するオブジェクトが存在したとき
            if ( intersectCubes.length > 0 ) {
                // 交差オブジェクトの先頭を取得
                const intersectCube = intersectCubes[0].object as Mesh;
                // ポインタが交差したオブジェクトが変わったとき
                if ( currentIntersect.mesh !== intersectCube ) {
                    // カレントの交差オブジェクトのマテリアルを戻す
                    if ( currentIntersect.mesh&&currentIntersect.mesh.material&&currentIntersect.tempMaterial ){
                        currentIntersect.mesh.material = currentIntersect.tempMaterial;
                    }
                    // 新しい交差オブジェクトでカレントを置き換える
                    if ( intersectCube.material ) {
                        intersectObjectRef.current = { mesh: intersectCube, tempMaterial: intersectCube.material };
                    }
                    // 交差オブジェクトのマテリアルを変更
                    intersectCube.material = new MeshStandardMaterial({ color: 0xffffff });
                }
            // ポインタと交差するオブジェクトが存在しないとき
            } else {
                // カレントの交差オブジェクトのマテリアルを戻す
                if( currentIntersect.mesh && currentIntersect.tempMaterial ){
                    currentIntersect.mesh.material = currentIntersect.tempMaterial;
                }
                // カレントの交差オブジェクトをクリアする
                intersectObjectRef.current = { mesh: null, tempMaterial: null };
            }
        }

        // 回転操作のアニメーション
        if(group && stats){
            if( stats.isRotation ){
                // 回転処理
                // const rotationGroup = stats.rotationGroup;
                const rotationGroup = rotationGroupRef.current;
                if( rotationGroup ){
                    // フレームごとの回転角度
                    const theta = delta * props.moveSpeed;
                    // 現時点の回転角度を保持
                    stats.currentAngle += theta;
                    // 回転対象グループを回転させる
                    rotationGroup.rotateOnAxis( stats.rotateAxis!, theta );
                    // 一定角度に到達した時点で終了処理
                    if( stats.currentAngle+(theta*1.5) > stats.targetAngle ){
                        // 目標の回転角度まで回転させる
                        rotationGroup.rotateOnAxis( stats.rotateAxis!, stats.targetAngle-stats.currentAngle );
                        // 対象グループを初期グループに戻す
                        const target: Array<Object3D> = [];
                        rotationGroup.children.forEach( ( cube ) => {
                            target.push( cube )
                        } );
                        target.forEach( ( cube ) => {
                            group.attach( cube );
                        } );
                        // 回転状態のフラグをオフ
                        stats.isRotation = false;
                        // 回転操作の終了を通知
                        if( props.onRotationFinished ) props.onRotationFinished( stats.rotateSymbol );
                    }
                }
            }else{
                const currentCubeMode = cubeModeRef.current;
                if( currentCubeMode === "manual" ){
                    // 通常モードの場合はキー入力に応じて回転操作を行う
                    inputOrder();
                }
                if( currentCubeMode === "demo" ){
                    // デモモードの場合はランダムに回転操作を行う
                    rotation( rand.shuffle( rotationSymbols.all )[0] );
                }
                if( currentCubeMode === "order" || currentCubeMode === "reverse" ){
                    // 回転記号モードの場合はキューに積まれた操作を行う
                    const nextSymbol = rotateStatesRef.current.rotateQueue.shift();
                    if ( nextSymbol ) {
                        rotation( nextSymbol, currentCubeMode === "reverse" );
                    }else{
                        // キューがなくなったら終了を通知
                        cubeModeRef.current = "manual";
                        if( props.onOrderFinished ) props.onOrderFinished();
                    }
                }
            }
        }
    });

    // 回転動作
    const rotation = function( symbolString: string, reverse?: boolean ){
        const group = rubikCubeGroupRef.current;
        const stats = rotateStatesRef.current;
        if( group && stats ){
            // 回転操作を開始する
            if( stats.isRotation ){
                // 回転中の場合は操作を受け付けない
                console.log("rubikcube is busy.");
            }else{
                // 回転操作の準備
                // console.log("rotation:"+symbolString);
                // 指示された操作名をチェック
                const symbol = rotationSymbols.all.find( e => e === symbolString );
                if( symbol === undefined ){
                    // 操作名が不明な場合はエラー
                    console.log("it is NOT rotation symbol syntax:"+symbol);
                }else{
                    // 操作名を取得して回転状態の準備
                    stats.rotateSymbol = symbol;
                    const [symbol_base, ...sAttach] = stats.rotateSymbol.split("");
                    // 操作対象ベクトルを取得
                    stats.symbolVector = rotationSymbols.getVector( symbol_base );
                    // 回転操作の開始角度（初期化）
                    stats.currentAngle = 0;
                    // 回転操作の終了角度（x2操作は180°／それ以外は90°）
                    stats.targetAngle = ( sAttach.includes("2") ) ? Math.PI : Math.PI*0.5;
                    // 回転軸ベクトルを取得：逆回しの場合は反転(negate)して逆回転化
                    stats.rotateAxis = rotationSymbols.getRotateAxis( symbol_base );
                    stats.rotateAxis = ( sAttach.includes("'") ) ? stats.rotateAxis.negate(): stats.rotateAxis;
                    // 回転対象のキューブをグループ化する
                    // const rotationGroup = stats.rotationGroup;
                    const rotationGroup = rotationGroupRef.current;
                    if( rotationGroup ){
                        // 回転対象の候補キューブをリストアップ
                        const target: Array<Object3D> = [];
                        group.children.forEach( (cube) => {
                            // 持ち替えの場合：すべて対象
                            if( stats.rotateSymbol.match(/[xyz]/) ){
                                target.push( cube );
                            // ２層回しの場合：回転対象ベクトルに対して直角まで（～９５度までとする）
                            }else if( symbol.match(/[w]/) ){
                                if( cube.position.angleTo( stats.symbolVector ) < Math.PI*0.526 ){
                                    target.push( cube );
                                }
                            // スライスムーブの場合：回転対象ベクトルに対して直角のみ（８５～９５度までとする）
                            }else if( symbol.match(/[MES]/) ){
                                if(    cube.position.angleTo( stats.symbolVector ) > Math.PI*0.476 
                                    && cube.position.angleTo( stats.symbolVector ) < Math.PI*0.526 ){
                                    target.push( cube );
                                }
                            // 通常ムーブの場合：回転対象ベクトルに対して直角未満（～８５度までとする）
                            }else{
                                if( cube.position.angleTo( stats.symbolVector ) < Math.PI*0.476 ){
                                    target.push( cube );
                                }
                            }
                        } );
                        // 回転対象グループのローテーションをリセット
                        rotationGroup.rotation.set( 0, 0, 0 );
                        // 候補キューブを回転対象グループに入れる
                        target.forEach( ( cube ) => { rotationGroup.add( cube ) } );
                    }
                    // 回転状態のフラグをオン
                    stats.isRotation = true;
                    // 回転操作の履歴を追記（逆操作の場合は履歴を削除）
                    if( reverse ){
                        stats.history.pop();
                    }else{
                        stats.history.push( stats.rotateSymbol );
                    }
                    // 回転操作の開始を通知
                    if( props.onRotationStarted ) props.onRotationStarted( stats.rotateSymbol );
                    keyInputRef.current.forEach((_,k) => {
                        if(k!=="w"&&k!=="W"){
                            keyInputRef.current.set(k,false);
                        }
                    });
                }
            }
        }
    };

    // キー入力動作
    const keyInputRef = useRef<Map<string,boolean>>(new Map());
    const inputOrder = () => {
        const keyLog = keyInputRef.current;
        // console.log( keyLog );
        // ２層回し
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("r")&&rotation( "Rw" );
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("l")&&rotation( "Lw" );
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("u")&&rotation( "Uw" );
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("d")&&rotation( "Dw" );
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("f")&&rotation( "Fw" );
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("b")&&rotation( "Bw" );
        // ２層回し（逆回転）
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("R")&&rotation( "R'w" );
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("L")&&rotation( "L'w" );
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("U")&&rotation( "U'w" );
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("D")&&rotation( "D'w" );
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("F")&&rotation( "F'w" );
        (keyLog.get("w")||keyLog.get("W"))&&keyLog.get("B")&&rotation( "B'w" );
        // 通常操作
        keyLog.get("r")&&rotation( "R" );
        keyLog.get("l")&&rotation( "L" );
        keyLog.get("u")&&rotation( "U" );
        keyLog.get("d")&&rotation( "D" );
        keyLog.get("f")&&rotation( "F" );
        keyLog.get("b")&&rotation( "B" );
        // 通常操作（逆回転）
        keyLog.get("R")&&rotation( "R'" );
        keyLog.get("L")&&rotation( "L'" );
        keyLog.get("U")&&rotation( "U'" );
        keyLog.get("D")&&rotation( "D'" );
        keyLog.get("F")&&rotation( "F'" );
        keyLog.get("B")&&rotation( "B'" );
        // スライス
        keyLog.get("e")&&rotation( "E" );
        keyLog.get("m")&&rotation( "M" );
        keyLog.get("s")&&rotation( "S" );
        // スライス（逆回転）
        keyLog.get("E")&&rotation( "E'" );
        keyLog.get("M")&&rotation( "M'" );
        keyLog.get("S")&&rotation( "S'" );
        // 持ち替え
        keyLog.get("x")&&rotation( "x" );
        keyLog.get("y")&&rotation( "y" );
        keyLog.get("z")&&rotation( "z" );
        // 持ち替え（逆回転）
        keyLog.get("X")&&rotation( "x'" );
        keyLog.get("Y")&&rotation( "y'" );
        keyLog.get("Z")&&rotation( "z'" );
    }
    
    // 親コンポーネントへ公開するハンドラ
    useImperativeHandle( ref, () => {
        return {
            onKeyDown: (elem: string) => {
                keyInputRef.current.set( elem, true );
            },
            onKeyUp: (elem: string) => {
                keyInputRef.current.set( elem, false );
            },
            setCubeMode: (mode: CubeMode) => {
                cubeModeRef.current = mode;
            },
            requestOrder: (...symbol: string[]) => {
                rotateStatesRef.current?.rotateQueue.push( ...symbol );
                cubeModeRef.current = "order";
                if( props.onOrderStarted ) props.onOrderStarted();
            },
            requestReverse: () => {
                // eslint-disable-next-line no-unsafe-optional-chaining
                const reverseHistory = [...rotateStatesRef.current?.history]
                    .reverse()
                    .map( e => e.indexOf("'")>0 ? e.replace("'","") : e.replace(/^(.)/,"$1'") );
                rotateStatesRef.current?.rotateQueue.push( ...reverseHistory );
                cubeModeRef.current = "reverse";
                if( props.onOrderStarted ) props.onOrderStarted();
            },
            history: rotateStatesRef.current?.history,
        } as CubeHandle
    }, [ props ] );

    return (
        <>
            <group
                position={ props.position }
                ref={ rubikCubeGroupRef }
            >
            </group>
            <group
                position={ props.position }
                ref={ rotationGroupRef} >
            </group>
        </>
    );
});

export default RubikCube;
