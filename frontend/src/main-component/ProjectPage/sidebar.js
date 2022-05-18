import React, { useState } from "react";
import StepZilla from "react-stepzilla";

import "../../sass/multistep.css";
import Step1 from "../../components/MultistepForm/step1";
import Step2 from "../../components/MultistepForm/step2";
import Step3 from "../../components/MultistepForm/step3";

const CauseSidebar = (props) => {
  const [sampleStore, setSampleStore] = useState({});

  const getStore = () => {
    return sampleStore;
  };

  const updateStore = (update) => {
    setSampleStore((prev) => ({ ...prev, ...update }));
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
        />
      ),
    },
  ];

  return (
    <div className="col col-lg-4 col-12">
      <div className="blog-sidebar">
        <div className="widget category-widget">
          <h3>Donate Here</h3>
          <div className="step-progress">
            <StepZilla steps={steps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CauseSidebar;
