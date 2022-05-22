import React, { useState } from "react";
import StepZilla from "react-stepzilla";

import "../../sass/multistep.css";
import "./style.css";
import Step1 from "../../components/MultistepForm/step1";
import Step2 from "../../components/MultistepForm/step2";
import Step3 from "../../components/MultistepForm/step3";

const CauseSidebar = (props) => {
  const [sampleStore, setSampleStore] = useState({});
  const [donation, setDonations] = useState({
    toggle: false,
    amount: "",
    project_name: "",
  });
  const getStore = () => {
    return sampleStore;
  };

  const updateStore = (update) => {
    setSampleStore((prev) => ({ ...prev, ...update }));
  };

  const onChange = (e) => {
    const { amount, project_name } = e;
    setDonations({ toggle: true, amount, project_name });
  };
  const steps = [
    {
      name: "Pledge",
      component: (
        <Step1
          getStore={getStore}
          updateStore={updateStore}
          campaign={props.campaign}
        />
      ),
    },
    {
      name: "Info",
      component: <Step2 getStore={getStore} updateStore={updateStore} />,
    },
    {
      name: "Donate",
      component: (
        <Step3
          getStore={getStore}
          updateStore={updateStore}
          campaign={props.campaign}
          donated={props.donated}
          setDonated={props.setDonated}
          onChange={(e) => onChange(e)}
        />
      ),
    },
  ];
  console.log(props);
  return (
    <div className="col col-lg-5 col-12 ">
      {donation.toggle ? (
        <div className="blog-sidebar">
          <div className="widget category-widget">
            <h3>Registered</h3>
            <div
              className="step-progress custom-step-progress"
              style={{ width: "340px" }}
            >
              <div>
                <div>{donation.amount}</div>
                <div>{donation.project_name}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="blog-sidebar">
          <div className="widget category-widget">
            <h3>Donate Here</h3>
            <div
              className="step-progress custom-step-progress"
              style={{ width: "340px" }}
            >
              <StepZilla
                steps={steps}
                backButtonCls="btn btn-lg pull-left custom-color"
                nextButtonCls="btn btn-primary btn-lg pull-right"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CauseSidebar;
