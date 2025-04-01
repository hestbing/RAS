import { LabelWeight } from "../../types/commonTypes";

export interface DropDownItem{
    text: string;
    value: string;
}

export interface DropDownProps{
    items:Array<DropDownItem>;
    className?: string;
    selectedChanged: (value:string) => void;
    label?:string;
    lblWeight?: LabelWeight;
}