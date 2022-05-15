import React, { Component, useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Step1 = (props) => {
  const [inputValues, setinputValues] = useState({
    firstName: "",
    lastName: "",
  });
  return (
    <div className="step step3">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <FormControlLabel
            className="mb-2"
            control={<Checkbox />}
            label="Donate anonymously"
          />
          <div className="form-group content form-block-holder mb-4">
            <label className="control-label col-md-6">Firstname</label>
            <div>
              <input
                name="firstName"
                autoComplete="off"
                type="text"
                className="form-control"
                required
                defaultValue={""}
                onChange={(e) => {
                  setinputValues({ ...inputValues, firstName: e.target.value });
                }}
              />
            </div>
            <label className="control-label col-md-6">Lastname</label>
            <div>
              <input
                name="lastName"
                autoComplete="off"
                type="text"
                className="form-control"
                required
                defaultValue={""}
                onChange={(e) => {
                  setinputValues({ ...inputValues, firstName: e.target.value });
                }}
              />
            </div>
            <label className="control-label col-md-6">Email</label>
            <div>
              <input
                name="email"
                autoComplete="off"
                type="text"
                className="form-control"
                required
                defaultValue={""}
                onChange={(e) => {
                  setinputValues({ ...inputValues, firstName: e.target.value });
                }}
              />
            </div>
            <label className="control-label col-md-6">Country</label>
            <div>
              <input
                name="country"
                autoComplete="off"
                type="text"
                className="form-control"
                required
                defaultValue={""}
                onChange={(e) => {
                  setinputValues({ ...inputValues, firstName: e.target.value });
                }}
              />
            </div>
            <label className="control-label col-md-6">State</label>
            <div>
              <input
                name="state"
                autoComplete="off"
                type="text"
                className="form-control"
                required
                defaultValue={""}
                onChange={(e) => {
                  setinputValues({ ...inputValues, firstName: e.target.value });
                }}
              />
            </div>
            <label className="control-label col-md-6">Address</label>
            <div>
              <input
                name="address"
                autoComplete="off"
                type="text"
                className="form-control"
                required
                defaultValue={""}
                onChange={(e) => {
                  setinputValues({ ...inputValues, firstName: e.target.value });
                }}
              />
            </div>
            <label className="control-label col-md-6">City</label>
            <div>
              <input
                name="city"
                autoComplete="off"
                type="text"
                className="form-control"
                required
                defaultValue={""}
                onChange={(e) => {
                  setinputValues({ ...inputValues, firstName: e.target.value });
                }}
              />
            </div>
            <label className="control-label col-md-6">Zip Code</label>
            <div>
              <input
                name="zipCode"
                autoComplete="off"
                type="text"
                className="form-control"
                required
                defaultValue={""}
                onChange={(e) => {
                  setinputValues({ ...inputValues, firstName: e.target.value });
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Step1;
