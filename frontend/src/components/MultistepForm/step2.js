import React, { Component, useState } from "react";

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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Step1;
