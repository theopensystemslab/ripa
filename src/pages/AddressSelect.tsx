import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";

const AddressSelect = () => {
  return (
    <HVCenterContainer>
      The address of the property is
      <select>
        <option>30 Lake Road</option>
      </select>
      {/* <a href="#">It doesn't have an address</a> */}
    </HVCenterContainer>
  );
};

export default AddressSelect;
