import React, { Component, useState } from "react";

const Step1 = (props) => {
  const [inputValues, setinputValues] = useState({
    firstName: "",
    lastName: "",
  });
  return (
    <div className="step step3">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group col-md-12 content form-block-holder">
            <label className="control-label col-md-12">
              Select Your Crypto
            </label>
            <div className="mt-2">
              <select id="crypto" name="crypto">
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Step1;
