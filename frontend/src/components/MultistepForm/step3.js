import React, { useContext, useState,useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import QRCode from "react-qr-code";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import "./style.css";
import { FormGroup, Label, Col, Input, Form } from "reactstrap";
import {Spinner} from 'reactstrap';

import { AppContext } from "../../modules/contexts";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { getLatestPrice } from "../../modules/charges/services";

const Step3 = (props) => {
  const { connectMetaMask } = useContext(AppContext);
  const { account, library } = useWeb3React();
  const [fiatPrice,setFiatPrice]=useState()
  const [loading,setLoading]=useState(false);
  
  const fetchAndSetFiatPrice= async()=>{
    const current_unit_price = await getLatestPrice({ token: 'bnb', currency:'usd' });
    setFiatPrice(current_unit_price.USD*props.getStore().amount)
  } 
  
  const connected = async () => {
    await connectMetaMask();
    props.updateStore({
      ...props.getStore(),
      yourWalletAddress: account,
    });
  };

	useEffect(() => {
		fetchAndSetFiatPrice();
	}, [fetchAndSetFiatPrice]);


  useEffect(() => {
    props.updateStore({
      yourWalletAddress: account,
    });
  }, [account]);

  const copyAddress = () => {
    const copyText = document.getElementById("wallet");
    const textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    navigator.clipboard.writeText(textArea.value);
    textArea.remove();
  };

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: "errorMessage",
    })
  );

  const handleChange = (e) => {
    props.updateStore({
      ...props.getStore(),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info('Please keep patience, your transaction is being processed!!', {
      position: "bottom-right",
      autoClose: 25000,
      hideProgressBar: true,
      });

    const weiAmount = library.utils.toWei(props.getStore().amount);
    const receipt= await library.eth
      .sendTransaction({
        from: account,
        to: props.getStore().walletAddress,
        value: weiAmount,
      })
  
    if (validator.allValid()) {
      const body = {
        ...props.getStore(),
        donor: {
          fullName: props.getStore().fullName,
          email: props.getStore().email,
          country: props.getStore().country,
        },
        transactionId: receipt.transactionHash,
        campaignId: props.campaign.id,
      };
      const resData = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/donation/add`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      validator.hideMessages();

      // Catch the API response and set the below value as per API

      if (resData.data) {
        props.setDonated(!props.donated);
        props.onChange({});
        props.refreshData();
        props.updateStore({
          ...props.getStore(),
          donorAddress: account,
          transactionHash: receipt.transactionHash,
        });
        toast.dismiss()
        toast.success("Donation Complete successfully!");
        setLoading(false);
      }
    } else {
      validator.showMessages();
      return toast.error("Empty field is not allowed!");
    }
  };

  return (
    <div className="step step7">
      <div className="row">
        <div
          style={{
            textAlign: "center",
          }}
        >
          {props.getStore()?.yourWalletAddress ? (
            <div className="mt-3 mb-2">
              <FormGroup row className="mt-3">
                <Col sm={12}>
                  <p className="text-center">
                    <small>
                    <strong>Your wallet Address is:</strong>
                    <a
                      id="wallet"
                      onClick={() => {
                        copyAddress();
                      }}
                      style={{ cursor: "pointer",color:'#4f555a'}}
                      className={
                        props.getStore().yourWalletAddress ? "d-block " : "d-none"
                      }
                      title="Click to copy Wallet address"
                    >
                      {props.getStore().yourWalletAddress}
                    </a>
                    </small>
                  </p>
                </Col>
              </FormGroup>
              <FormGroup row className="p-3 bg-light">
              <Col
                  sm={8}
                >
                  <Input
                    name="amount"
                    type="number"
                    placeholder="Enter Amount in BNB"
                    onChange={handleChange}
                  />
                
                </Col>
                <Col sm={4} className="d-flex justify-content-center align-item-center">
                  <small><strong>Price in USD:</strong> ${fiatPrice?fiatPrice.toFixed(2):"0"}</small>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={12} className="d-flex justify-content-center align-item-center">
                <Spinner animation="border" className={loading?'d-block':'d-none'} />
                </Col>
              <Col sm={12} className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="btn-primary btn-lg btn btn-block mt-3"
                  >
                    Donate Now
                  </button>
                </Col>
              </FormGroup>
            </div>
          ) : (
            <div className="mt-3 mb-2">
              <p>Connect your wallet for donation</p>
              <button className="btn-primary btn-lg btn btn-outline" onClick={connected}>
                Connect Wallet
              </button>
            </div>
          )}
          <div className="text-center decoration">or</div>
        </div>
        <div>
          <p className="text-center">Scan the QR code to donate</p>
          <div
            style={{
              background: "#8080803b",
              paddingTop: "2rem",
              paddingBottom: "2rem",
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <QRCode
              value={props.getStore().walletAddress || "Wallet not selected"}
            />
          </div>
          <p className={props.getStore().walletAddress?'d-block text-center':'d-none'} ><small><strong>Fundraiser's Wallet:</strong> {props.getStore().walletAddress?props.getStore().walletAddress:""}</small></p>
        </div>
      </div>
    </div>
  );
};
export default Step3;
