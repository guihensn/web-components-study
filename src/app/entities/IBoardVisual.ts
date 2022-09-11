import { IFieldVisual } from "./IFieldVisual";

export interface IBoardVisual{
    get fields():IFieldVisual[][];
    get width():number;
    get height():number;
}