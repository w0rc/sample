/**
 * XorShiftによるランダム値生成クラス
 */
class XorShift {
    // XorShift 32bit random generator
    #x: number;
    #y: number;
    #z: number;
    #w: number;
    #t = 0;
    /**
     * Xorshiftクラスのコンストラクタ
     * @param seed シード値
     * @param [x=123456789] シード値2
     * @param [y=362436069] シード値3
     * @param [z=521288629] シード値4
     */
    constructor( seed?: number, x=123456789, y=362436069, z=521288629 ){
        this.#w = (seed === undefined) ? 88675123>>>0 : seed>>>0;
        this.#x = x>>>0;
        this.#y = y>>>0;
        this.#z = z>>>0;
        // 初期化時に適当な回数だけ回しておく
        for(let i=0; i<32; i++) this.gen();
    }
    /**
     * ランダム値を生成(integer/32bit)
     * @returns (0, 2^32)
     */
    gen(){
        this.#t=this.#x^(this.#x<<11);
        this.#x=this.#y;
        this.#y=this.#z;
        this.#z=this.#w;
        this.#w = ((this.#w^(this.#w>>>19))^(this.#t^(this.#t>>>8)))>>>0;
        return this.#w;
    }
    /**
     * ランダム値を生成(double)
     * @returns (0, 1)
     */
    rand(){
        return this.gen()/4294967296.0;
    }
    /**
     * ランダム値(range)
     * @param [min = 0] ランダム範囲の最小値
     * @param [max = 10] ランダム範囲の最大値
     * @returns [min, max)
     */
    range( min=0, max=10 ){
        return this.rand()*(max-min)+min;
    }
    /**
     * 配列のシャッフル
     * @param arr  シャッフルする配列
     * @returns シャッフル後の配列（shallow copy）
     */
    shuffle( arr: Array<any> ){
        const _arr: Array<any> = [];
        for( let i=0,j=0,l=arr.length; i<l; i++){
            j = Math.floor(this.range(0,i));
            _arr[i] = (i!==j) ? _arr[j] : _arr[i];
            _arr[j] = arr[i];
        }
        return _arr;
    }
}

export default XorShift;
