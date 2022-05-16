import React from "react";
import TextField from "@material-ui/core/TextField";

const Step1 = (props) => {
  const handleChange = (e) => {
    props.updateStore({
      ...props.getStore(),
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="step step3">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group col-md-12 content form-block-holder">
            <label className="control-label col-md-12">
              Select Your Crypto
            </label>
            <div className="mt-2">
              <select
                id="crypto"
                name="walletAddress"
                value={props.getStore().wallet}
                onChange={handleChange}
                defaultValue="Select"
              >
                <option value="">Select Wallet</option>
                {props.campaign?.wallets?.map((wallet, index) => {
                  return (
                    <option key={index} value={wallet.walletAddress}>
                      {wallet.name}
                    </option>
                  );
                })}
              </select>
              <div className="mt-4">
                <TextField
                  type="number"
                  name="amount"
                  label="Donate Amount"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Step1;
