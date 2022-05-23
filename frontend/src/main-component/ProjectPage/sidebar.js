import React, { useState } from 'react';
import StepZilla from 'react-stepzilla';

import '../../sass/multistep.css';
import './style.css';
import Step1 from '../../components/MultistepForm/step1';
import Step2 from '../../components/MultistepForm/step2';
import Step3 from '../../components/MultistepForm/step3';

const CauseSidebar = (props) => {
  const [sampleStore, setSampleStore] = useState({});
  const [donation, setDonations] = useState({
    toggle: false,
    amount: '',
    project_name: '',
  });
  const getStore = () => {
    return sampleStore;
  };

  const updateStore = (update) => {
    setSampleStore((prev) => ({ ...prev, ...update }));
  };

  const onChange = async (e) => {
    console.log(sampleStore, donation);
    await saveDonation();
    setDonations({ toggle: true });
  };

  const saveDonation = async () => {
    console.log('Save Donation here');
  };

  const steps = [
    {
      name: 'Pledge',
      component: (
        <Step1
          getStore={getStore}
          updateStore={updateStore}
          campaign={props.campaign}
        />
      ),
    },
    {
      name: 'Info',
      component: <Step2 getStore={getStore} updateStore={updateStore} />,
    },
    {
      name: 'Donate',
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

  return (
    <div className="col col-lg-5 col-12 ">
      {donation.toggle ? (
        <div className="blog-sidebar">
          <div className="widget category-widget">
            <h3>Thank you for your donation !!!</h3>
            <div
              className="step-progress custom-step-progress"
              style={{ width: '340px' }}
            >
              <div>
                <p>
                  Dear <strong>Firstname,</strong>
                </p>
                <p className="mt-4">
                  Thank you for your generous contribution of{' '}
                  <strong>Amount</strong> to <strong>Project Name</strong>.
                </p>
              </div>
              <div className="mt-5">
                <p className="height-height">
                  Amount : <strong>10 ETH</strong>
                </p>
                <p className="height-height">
                  Wallet address : <strong>dcxas323</strong>
                </p>
                <p className="height-height">
                  TXN Hash : <strong>df342</strong>
                </p>
                <p className="height-height">
                  Date : <strong>Date and time</strong>
                </p>
              </div>
              <div className="mt-5">
                <p className="height-height">Personal Information</p>
                <p className="height-height">
                  Name : <strong>Fullname</strong>
                </p>
                <p className="height-height">
                  Email : <strong>asd@mail.com</strong>
                </p>
                <p className="height-height">
                  Address : <strong>asfuiwer</strong>
                </p>
              </div>
              <div className="mt-4">
                <p>Regards</p>
                <p className="height-height-1">
                  <strong>Campaign Creator</strong>
                </p>
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
              style={{ width: '340px' }}
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
