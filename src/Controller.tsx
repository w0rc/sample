import { forwardRef, useImperativeHandle } from 'react';
import { useState } from 'react';
import { CubeMode, ControllerProperties, ControllerHandle } from './Types';

import './App.css';

const Controller = forwardRef<ControllerHandle, ControllerProperties>(
function Controller( props, ref ) {
    const [demoBtnClicked, setDemoBtnClicked] = useState( false );
    const [reverseBtnClicked, setReverseBtnClicked] = useState( false );
    const [orderBtnClicked, setOrderBtnClicked] = useState( false );
    const [symbols, setSymbols] = useState("");

    // 親コンポーネントへ公開するハンドラ
    useImperativeHandle( ref, () => {
        return {
            resetConsoles: () => {
                setReverseBtnClicked( false );
                setOrderBtnClicked( false );
            },
        }
    });

    return (
        <div className="Controller">
            <div>
                <div className="table">
                    { /** デモモードの開始ボタン */ }
                    <div>
                        <label htmlFor='demoBtn'>Demonstration:</label>
                    </div>
                    <div>
                        <input type="button"
                            id="demoBtn"
                            className={ demoBtnClicked ? "clicked" : "" }
                            value={ demoBtnClicked ? "stop" : "start" }
                            onClick={() => {
                                props.requestModeChange( demoBtnClicked ? "manual" : "demo" as CubeMode );
                                setDemoBtnClicked( !demoBtnClicked );
                            }}
                            disabled={ reverseBtnClicked || orderBtnClicked }
                        />
                    </div>
                    { /** 戻し操作の開始ボタン */ }
                    <div>
                        <label htmlFor='reverseBtn'>Reverse:</label>
                    </div>
                    <div>
                        <input type="button"
                            id="reverseBtn"
                            value="reverse"
                            //value={ reverseBtnClicked ? "stop" : "reverse" }
                            className={ reverseBtnClicked ? "clicked" : "" }
                            onClick={() => {
                                if( !reverseBtnClicked ) props.requestReverse();
                                setReverseBtnClicked( !reverseBtnClicked );
                            }}
                            disabled={ demoBtnClicked || orderBtnClicked || reverseBtnClicked }
                        />
                    </div>
                    { /** 回転速度の指定（入力） */ }
                    <div>
                        <label htmlFor="speedInput">Speed:</label>
                    </div>
                    <div>
                        <input type="number"
                            id="speedInput"
                            className="speed"
                            value={ props.moveSpeed }
                            onChange={(event) => {
                                const newSpeed = parseInt( event.target.value );
                                if( isNaN(newSpeed) || newSpeed <= 0 ){
                                    console.log( "Speed must be >0." );
                                }else{
                                    props.requestSetSpeed( newSpeed );
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            
            { /** 操作記号の入力 */ }
            <div className="inputSymbols">
                { /** 入力用テキストエリア */ }
                <label htmlFor="inputSymbols">InputSymbols:</label>
                <br />
                <textarea
                    id="inputSymbols"
                    value={ symbols }
                    onChange={(event) => setSymbols( event.target.value )}
                />
                { /** 入力した操作の開始ボタン */ }
                <input type="button"
                    id="orderBtn"
                    value="order"
                    className={ orderBtnClicked ? "clicked" : "" }
                    onClick={() => {
                        if ( !orderBtnClicked ) {
                            props.requestOrder( symbols );
                            props.requestModeChange( "order" as CubeMode );    
                        }
                        setOrderBtnClicked( !orderBtnClicked );
                    }}
                    disabled={ demoBtnClicked || orderBtnClicked || reverseBtnClicked }
                />
            </div>

            { /** 操作履歴の表示エリア */ }
            <div className="history">
                <label htmlFor="history">History:</label>
                <br />
                <textarea id="history" value={ props.history } readOnly />
            </div>
        </div>
    );
});

export default Controller;
