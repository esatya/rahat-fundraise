import React from "react";

import QRCode from "react-qr-code";

const Step1 = (props) => {
  const copyAddress = () => {
    const copyText = document.getElementById("wallet");
    const textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    navigator.clipboard.writeText(textArea.value);
    textArea.remove();
  };

  return (
    <div className="step step7">
      <div className="row">
        <p className="text-center">
          Use the address below to donate{" "}
          <span style={{ fontWeight: "600" }}>0.25 BTC </span>from your wallet.
        </p>
        <div className="text-center">
          <img src="https://assets.rumsan.com/esatya/eth-icon.png" />
        </div>
        <div
          style={{
            background: "white",
            padding: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <QRCode value={props.getStore().walletAddress} />
        </div>
        <p
          className="text-center"
          id="wallet"
          onClick={() => {
            copyAddress();
          }}
        >
          walletAddress: {props.getStore().walletAddress}
        </p>
      </div>
    </div>
  );
};
export default Step1;
