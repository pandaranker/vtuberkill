declare global {
    interface PlayerDivElement extends HTMLDivElement{
        _onEndMoveDelete:boolean | undefined;
        moveDelete:(PlayerDivElement)=>void;
    }
}
export {};