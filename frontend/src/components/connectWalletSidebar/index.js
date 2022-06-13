import React, { useContext, useState, useCallback, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Nav, NavDropdown } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Badge } from 'react-bootstrap';
import '../../css/walletSidebar.css';
import { AppContext } from '../../modules/contexts';
import { useWeb3React } from '@web3-react/core';
import {
  DEPLOYEMNT_NETWORK,
  EXPLORERS,
} from '../../constants/blockchainConstants';

function ConnectWallet({ name, customClass }) {
  const { account } = useWeb3React();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* Connect wallet portion*/
  const { connectMetaMask, connectFortmatic } = useContext(AppContext);

  /* disConnect wallet portion*/
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(account).then(
      function () {
        setCopied(true);
      },
      function (err) {
        console.error('ERR:', err);
      },
    );
  };

  const { disconnect } = useContext(AppContext);

  const [ethscanUrl, setEthscanUrl] = useState('');
  const [bscscanUrl, setBscscanUrl] = useState('');
  const [polygonscanUrl, setPolygonscanUrl] = useState('');

  const setExplorerurl = useCallback(() => {
    if (DEPLOYEMNT_NETWORK === 'testnet') {
      setEthscanUrl(EXPLORERS[4]);
      setBscscanUrl(EXPLORERS[97]);
      setPolygonscanUrl(EXPLORERS[80001]);
    }

    if (DEPLOYEMNT_NETWORK === 'mainnet') {
      setEthscanUrl(EXPLORERS[1]);
      setBscscanUrl(EXPLORERS[56]);
      setPolygonscanUrl(EXPLORERS[137]);
    }
  }, []);

  useEffect(() => {
    setExplorerurl();
  }, [setExplorerurl]);

  return (
    <>
      <button
        onClick={handleShow}
        className={customClass ? customClass : 'theme-btn btn-lg'}
      >
        {name}{' '}
      </button>
      {account ? (
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            {/* <Link to="#">
              <img
                src="https://assets.rumsan.com/rumsan-group/agansing-rai.jpg"
                alt="test images"
                style={{ width: '50px', marginRight: '50px' }}
              />
            </Link> */}
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="My Wallet"
                menuVariant="light"
                className="dropdownItem"
              >
                <NavDropdown.Item href="#action/3.1">MetaMask</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    disconnect();
                  }}
                >
                  <img
                    src="https://assets.rumsan.com/esatya/logout.png"
                    alt="Logout"
                    style={{
                      width: '28px',
                      borderRadius: '0%',
                      paddingRight: '8px',
                    }}
                  />{' '}
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <img
                    src="https://assets.rumsan.com/esatya/refresh.png"
                    alt="refresh"
                    style={{
                      width: '28px',
                      borderRadius: '0%',
                      paddingRight: '8px',
                    }}
                  />{' '}
                  Refresh
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Header>
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      {copied ? (
                        <span>Copied</span>
                      ) : (
                        <span>Copy Wallet Address</span>
                      )}
                    </Tooltip>
                  }
                >
                  <Badge
                    bg="secondary"
                    text="light"
                    style={{ cursor: 'pointer' }}
                    onClick={handleCopyToClipboard}
                  >
                    Wallet Address: {account}
                  </Badge>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <Offcanvas.Body>
            <div className="row mt-2">
              <div className="wallet-balance">
                <p>Total Balance</p>
                <h4>$0.00 USD</h4>
                <Button className="me-2 customConnected">Add Funds</Button>
              </div>
            </div>
            <hr />
            <div className="row mt-4">
              <div className="col-12">
                <ListGroup>
                  <ListGroup.Item
                    action
                    href={`${ethscanUrl}/address/${account}`}
                    target="_blank"
                    style={{ fontSize: '16px', color: 'rgb(4, 17, 29)' }}
                  >
                    <img
                      src="https://assets.rumsan.com/esatya/eth.png"
                      alt="test images"
                      style={{ width: '30px', marginRight: '15px' }}
                    />
                    View on Ethereum
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href={`${bscscanUrl}/address/${account}`}
                    style={{ fontSize: '16px', color: 'rgb(4, 17, 29)' }}
                  >
                    <img
                      src="https://assets.rumsan.com/esatya/binance.png"
                      alt="test images"
                      style={{ width: '30px', marginRight: '15px' }}
                    />
                    View on Binance
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href={`${polygonscanUrl}/address/${account}`}
                    style={{ fontSize: '16px', color: 'rgb(4, 17, 29)' }}
                  >
                    <img
                      src="https://assets.rumsan.com/esatya/polygon-matic-logo.png"
                      alt="test images"
                      style={{ width: '30px', marginRight: '15px' }}
                    />
                    View on Polygon
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
            <hr />
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Connect Wallet</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>
              Connect with one of our available wallet providers or create a new
              one.
            </p>
            <div className="row">
              <div className="wallet-options" onClick={connectMetaMask}>
                <img
                  src="https://assets.rumsan.com/esatya/metamask-fox.png"
                  alt="connect meta mask"
                />
                MetaMask
              </div>
            </div>
            <div className="row">
              <div className="wallet-options" onClick={connectFortmatic}>
                <img
                  src="https://assets.rumsan.com/rumsan-group/xcapit-logo.png"
                  alt="xcapit"
                />
                Xcapit
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </>
  );
}

export default ConnectWallet;
