import React from "react";
interface IStreetAddress {
    title?: string;
    type: string;
    options: string[];
    includeLookup?: boolean;
    topSpacing?: number;
}
export declare const StreetAddress: React.FC<IStreetAddress>;
export default StreetAddress;
