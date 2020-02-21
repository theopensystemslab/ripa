import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";

const AddressSelect = ({ addresses = [], handleChange = undefined }) => {
  return (
    <HVCenterContainer>
      The address of the property is
      <select onChange={handleChange}>
        <option />
        {addresses.map(address => {
          return (
            <option key={address.id} value={address.id}>
              {address.name}
            </option>
          );
        })}
      </select>
      {/* <a href="#">It doesn't have an address</a> */}
    </HVCenterContainer>
  );
};

export default AddressSelect;
