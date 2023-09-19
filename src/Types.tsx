import { Material, Mesh, Vector3 } from "three";

/**
 * RubikCube Types
 */
/** キューブのモード */
export type CubeMode = "manual" | "demo" | "order" | "reverse";
/** キューブのプロパティ */
export type CubeProperties = {
    position: Vector3,
    moveSpeed: number,
    /** キューブ操作（１回）の開始イベント */
    onRotationStarted?: (symbol: string) => void,
    /** キューブ操作（１回）の終了イベント */
    onRotationFinished?: (symbol: string) => void,
    /** キューブ操作（連続）の開始イベント */
    onOrderStarted?: () => void,
    /** キューブ操作（連続）の終了イベント */
    onOrderFinished?: () => void,
};
/** キューブの制御を行うメソッド */
export type CubeHandle = {
    /** KeyDown時の処理 */
    onKeyDown: ( key: string ) => void,
    /** KeyUp時の処理 */
    onKeyUp: ( key: string ) => void,
    /** モード変更 */
    setCubeMode: ( mode: CubeMode ) => void,
    /** オーダ追加 */
    requestOrder: ( ...symbol: string[] ) => void,
    /** 逆操作の開始 */
    requestReverse: () => void,
    /** 操作履歴 */
    history: string[],
};
/** キューブの回転制御を管理するプロパティ */
export type CubeRotateStates = {
    isRotation: boolean,
    rotateSymbol: string,
    symbolVector: Vector3,
    currentAngle: number,
    targetAngle: number,
    rotateAxis: Vector3,
    history: Array<string>,
    rotateQueue: Array<string>,
};
export type IntersectObject = {
    mesh: Mesh | null,
    tempMaterial: Material | Material[] | null,
}

/**
 * Controller Types
 */
/** コントローラのプロパティ */
export type ControllerProperties = {
    moveSpeed: number,
    history?: string,
    requestSetSpeed: (moveSpeed: number) => void,
    requestModeChange: (mode: CubeMode) => void,
    requestOrder: (...symbol: string[]) => void,
    requestReverse: () => void,
};
/** コントローラの制御を行うメソッド */
export type ControllerHandle = {
    resetConsoles: () => void,
}
