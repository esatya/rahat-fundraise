import React, { useCallback, useEffect } from 'react';
// import TextField from '@material-ui/core/TextField';
import { shortenString } from '../../helper/helper';
import { supportedChains} from "../../utils/chains";

const Step1 = (props) => {
  

  const handleChange = (e) => {
    props.updateStore({
      ...props.getStore(),
      [e.target.name]: e.target.value,
    });
  };

  const defaultNetwork=useCallback(()=>{
    if(!props?.campaign?.wallets?.length) return
      props.updateStore({
        ...props.getStore(),
        walletAddress: props?.campaign?.wallets?.[0]?.walletAddress,
      });
  },[props.campaign])

  const networkName=useCallback(()=>{
   const name= document.getElementById(`${props.getStore().walletAddress}`)
   const netName=name?.innerHTML.split("-")[0].trim()
   {Object.keys(supportedChains).map((el, i) => {
    if (supportedChains[el].chainName===netName){
      props.updateStore({
        ...props.getStore(),
        networkId:el?el:'-'
      })    
    }
 })}
  },[props.getStore().walletAddress])


	useEffect(() => {
		defaultNetwork();
	}, [defaultNetwork]);

  useEffect(() => {
		networkName();
	}, [networkName]);

  return (
    <div className="step step3">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group col-md-12 content form-block-holder">
            <label className="control-label col-md-12 mt-2">
             <strong>Select Fundraiser's Wallet</strong> 
            </label>
            <div className="mt-2 mb-4">
              <select
                id="crypto" className='form-select'
                name="walletAddress"
                value={props.getStore().walletAddress}
                onChange={handleChange}
              >
                {props.campaign?.wallets?.map((wallet, index) => {
                  return (
                    <option id={wallet.walletAddress} key={index}  value={wallet.walletAddress} >
                      {wallet.name +
                        ' - ' +
                        shortenString(wallet?.walletAddress)}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Step1;
