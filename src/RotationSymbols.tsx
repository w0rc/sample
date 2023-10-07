import { Vector3 } from 'three';

/** 
 * ルービックキューブの回転記号（quarter-turn metric）と、
 * 回転記号が示すベクトルを保持するクラス
*/
class RotationSymbols{
    /** 
     * 回転記号（全て）
    */
    readonly all: Array<string>;
    /** 
     * 回転記号（持ち替えを除く全て）
    */
    readonly notakes: Array<string>;
    /** 
     * 回転記号（基本パターン）
    */
    readonly standard: Array<string>;
    /** 
     * 回転記号（スクランブル用）
    */
    readonly scramble: Array<string>;
    /** 
     * 回転記号が指し示す方向のベクトル
    */
    readonly vectors: Map<string,Vector3>;
    /**
     * 回転記号に対応する回転軸のベクトル
     */
    readonly rotateAxes: Map<string,Vector3>;
    
    /**
     * コンストラクタ
     */
    constructor(){
        // 回転記号に使用される文字のリスト
        const basics = ["R","L","U","D","F","B"];
        const slices = ["M","E","S"];
        const takes  = ["x","y","z"];
        // 基本１(A ,A',A2)：１８パターン
        const inv  = basics.map(x => x+"'");
        const half = basics.map(x => x+"2");
        const symbol_basics = basics.concat(inv).concat(half);
        // 基本１(A ,A',A2)＋(A'2)：２４パターン
        const invhalf  = basics.map(x => x+"'2");
        const invhalf2 = basics.map(x => x+"2'");
        const symbol_basics2 = symbol_basics.concat(invhalf).concat(invhalf2);
        // ２層回し(Aw ,A'w,Aw2)：１８パターン
        const dbls  = basics.map(x => x+"w");
        const dinv  = basics.map(x => x+"'w");
        const dhalf = basics.map(x => x+"w2");
        const symbol_dbls = dbls.concat(dinv).concat(dhalf);
        // ２層回し(Aw ,A'w,Aw2)＋(A'w2)：２４パターン
        const dinvhalf  = basics.map(x => x+"'w2");
        const dinvhalf2 = basics.map(x => x+"w2'");
        const symbol_dbls2 = symbol_dbls.concat(dinvhalf).concat(dinvhalf2);
        // スライスムーブ(A ,A',A2)：９パターン
        const sinv  = slices.map(x => x+"'");
        const shalf = slices.map(x => x+"2");
        const symbol_slices = slices.concat(sinv).concat(shalf);
        // スライスムーブ(A ,A',A2)＋(A'2)：１２パターン
        const sinvhalf   = slices.map(x => x+"'2");
        const sinvhalf2  = slices.map(x => x+"2'");
        const symbol_slices2 = symbol_slices.concat(sinvhalf).concat(sinvhalf2);
        // 持ち替え(A ,A')：６パターン
        const tinv = takes.map(x => x+"'");
        const symbol_takes = takes.concat(tinv);
        // 持ち替え(A ,A')+(A2, A'2)：１２パターン
        const thalf = takes.map(x => x+"2");
        const tinvhalf  = takes.map(x => x+"'2");
        const tinvhalf2 = takes.map(x => x+"2'");
        const symbol_takes2 = symbol_takes.concat(thalf).concat(tinvhalf).concat(tinvhalf2);
        // 回転記号のシリーズを初期化
        this.all = Array.prototype.concat(
            symbol_basics2,
            symbol_slices2,
            symbol_dbls2,
            symbol_takes2 );
        this.notakes = Array.prototype.concat(
            symbol_basics2,
            symbol_slices2,
            symbol_dbls2 );
        this.standard = Array.prototype.concat(
            symbol_basics,
            symbol_slices,
            symbol_dbls,
            symbol_takes );
        this.scramble = Array.prototype.concat(
            symbol_basics );
        
        this.vectors = new Map<string, Vector3>([
            ["R",new Vector3(  1,  0,  0 )], ["L",new Vector3( -1,  0,  0 )],
            ["U",new Vector3(  0,  1,  0 )], ["D",new Vector3(  0, -1,  0 )],
            ["F",new Vector3(  0,  0,  1 )], ["B",new Vector3(  0,  0, -1 )],
            ["M",new Vector3( -1,  0,  0 )], ["E",new Vector3(  0, -1,  0 )], ["S",new Vector3(  0,  0,  1 )],
            ["x",new Vector3(  1,  0,  0 )], ["y",new Vector3(  0,  1,  0 )], ["z",new Vector3(  0,  0,  1 )]
        ]);

        this.rotateAxes = new Map<string, Vector3>([
            ["R",new Vector3( -1,  0,  0 )], ["L",new Vector3(  1,  0,  0 )],
            ["U",new Vector3(  0, -1,  0 )], ["D",new Vector3(  0,  1,  0 )],
            ["F",new Vector3(  0,  0, -1 )], ["B",new Vector3(  0,  0,  1 )],
            ["M",new Vector3(  1,  0,  0 )], ["E",new Vector3(  0,  1,  0 )], ["S",new Vector3(  0,  0, -1 )],
            ["x",new Vector3( -1,  0,  0 )], ["y",new Vector3(  0, -1,  0 )], ["z",new Vector3(  0,  0, -1 )]
        ]);
    }

    getVector( symbol: string ){
        const vector = this.vectors.get( symbol );
        if(vector){
            return vector;
        }else{
            throw new Error( symbol+" is not Rotation Symbol.");
        }
    }

    getRotateAxis( symbol: string ){
        const axis = this.rotateAxes.get( symbol );
        if(axis){
            return axis;
        }else{
            throw new Error( symbol+" is not Rotation Symbol.");
        }
    }
}

export default RotationSymbols;
