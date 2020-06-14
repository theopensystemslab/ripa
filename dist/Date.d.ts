import * as React from "react";
interface IDate {
    title?: string;
    name: string;
    type: string;
    options: string[];
    inputProps: ILimits;
    includeSubmit?: boolean;
}
interface ILimits {
    day: {
        min: number;
        max: number;
    };
    month: {
        min: number;
        max: number;
    };
    year: {
        min: number;
        max: number;
    };
}
export declare const Date: React.FC<IDate>;
export default Date;
