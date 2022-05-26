import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import QRCode from 'react-qr-code';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import './style.css';
import { FormGroup, Label, Col, Input } from 'reactstrap';

import { AppContext } from '../../modules/contexts';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

const Step3 = (props) => {
  const { connectMetaMask } = useContext(AppContext);
  const { account } = useWeb3React();

  const connected = async () => {
    await connectMetaMask();
    props.updateStore({
      ...props.getStore(),
      walletAddress: account,
    });
  };

  useEffect(() => {
    props.updateStore({
      walletAddress: account,
    });
  }, [account]);

  const copyAddress = () => {
    const copyText = document.getElementById('wallet');
    const textArea = document.createElement('textarea');
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    navigator.clipboard.writeText(textArea.value);
    textArea.remove();
  };

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: 'errorMessage',
    }),
  );

  const handleChange = (e) => {
    props.updateStore({
      ...props.getStore(),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.allValid()) {
      const body = {
        ...props.getStore(),
        donor: {
          fullName: props.getStore().fullName,
          email: props.getStore().email,
          country: props.getStore().country,
        },
        transactionId: uuidv4(),
        campaignId: props.campaign.id,
      };
      const resData = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/donation/add`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then((res) => res.json());

      validator.hideMessages();

      // Catch the API response and set the below value as per API

      if (resData.data) {
        props.setDonated(!props.donated);
        props.onChange({});
        props.refreshData();
        toast.success('Donation Complete successfully!');
      }
    } else {
      validator.showMessages();
      return toast.error('Empty field is not allowed!');
    }
  };


  return (
    <div className="step step7">
      <div className="row">
        <div
          style={{
            textAlign: 'center',
          }}
        >
          {props.getStore()?.walletAddress ? (
            <div className="mt-3 mb-2">
              <FormGroup row className='mt-3'>
                <Col sm={8} xs={8} className="d-flex align-item-center justify-content-center"
>
                  <Input
                    name="amount"
                    type="number"
                    placeholder="Enter Amount"
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={4} xs={4}>
                  <button
                    onClick={handleSubmit}
                 className="btn-primary btn-lg btn"
                  >
                    Donate
                  </button>
                </Col>
              </FormGroup>
            </div>
          ) : (
            <div className="mt-3 mb-2">
              <p>Connect your wallet for donation</p>
              <button
                className="btn-primary btn-lg btn"
                onClick={connected}
              
              >
                Connect Wallet
              </button>
            </div>
          )}
          <div className="text-center decoratio">or</div>
        </div>
        <div>
          <p className="text-center">Scan the QR code to donate</p>
          <div
            style={{
              background: 'white',
              padding: '5px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <QRCode
              value={props.getStore().walletAddress || 'Wallet not selected'}
            />
          </div>
          <p
            className="text-center mt-2"
            id="wallet"
            onClick={() => {
              copyAddress();
            }}
          >
         <div className={props.getStore().walletAddress?'d-block':'d-none'}><strong>Your wallet Address:</strong><br/> {props.getStore().walletAddress}</div>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Step3;
