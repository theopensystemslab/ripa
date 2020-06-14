import * as React from "react";
interface IMinMax {
    min?: number;
    max?: number;
}
interface IText {
    title?: string;
    type: string;
    name: string;
    multiline?: boolean;
    label?: string;
    fullWidth?: boolean;
    required?: boolean;
    placeholder?: string;
    unit?: string;
    min?: string;
    max?: string;
    topSpacing?: number;
    maxWords?: number;
    inputProps?: IMinMax;
    includeSubmit?: boolean;
}
export declare const Text: React.FC<IText>;
export default Text;
