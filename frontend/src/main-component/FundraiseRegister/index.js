import { toast } from 'react-toastify';
import React, { useState, Fragment, useContext } from 'react';
import dayjs from 'dayjs';

import Logo from '../../images/logo.png';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import PageTitle from '../../components/pagetitle';
import UserContext from '../../context/user-context';
import Scrollbar from '../../components/scrollbar';
import { isObjEmpty } from '../../helper/helper';

const FundraiseRegisterPage = (props) => {
  const [value, setValue] = useState({
    title: '',
    excerpt: '',
    story: '',
    target: '',
    expiryDate: '',
    walletType: 'Ethereum',
    walletAddress: '',
  });

  const [wallets, setWallets] = useState([]);

  const { user } = useContext(UserContext);

  const [image, setImage] = useState(null);

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const removeWallet = (index) => {
    const newWallets = value.wallets?.filter((item, idx) => index !== idx);
    setWallets(newWallets);
  };

  const handleWalletSave = (event) => {
    event.preventDefault();
    setWallets(
      wallets.concat({
        name: value?.walletType || 'Ethereum',
        walletAddress: value?.walletAddress,
      }),
    );
    setValue((previous) => {
      return {
        ...previous,
        walletType: 'Ethereum',
        walletAddress: '',
      };
    });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (wallets?.length <= 0) {
      toast.info('Please add at least one wallet.');
      return;
    }

    const formData = new FormData();
    formData.append('title', value.title);
    formData.append('excerpt', value.excerpt);
    formData.append('story', value.story);
    formData.append('target', value.target);
    formData.append('expiryDate', dayjs(value.expiryDate).format('YYYY-MM-DD'));
    formData.append('image', image);
    formData.append('wallets', JSON.stringify(wallets));

    try {
      const resData = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/campaign/add`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        },
      ).then((res) => res.json());

      if (resData?.ok) {
        props.history.push('/myfundraise');
      } else {
        throw new Error('Failed to register campaign.');
      }
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <Navbar Logo={Logo} />
      <PageTitle pageTitle={'Register'} pagesub={'Register'} />
      <div className="wpo-donation-page-area section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="wpo-donate-header">
                <h2>Register Here To Organize A Campaign</h2>
              </div>
              <div id="Donations" className="tab-pane">
                <form onSubmit={SubmitHandler}>
                  <div className="wpo-donations-details">
                    <h2>Enter details of your campaign?</h2>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                        <label for="fname" class="form-label">
                          Enter an amount
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="target"
                          id="fname"
                          placeholder=""
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                        <label for="fname" class="form-label">
                          Campaign End Date
                        </label>
                        <input
                          type="date"
                          min={dayjs().add('1', 'day').format('YYYY-MM-DD')}
                          className="form-control"
                          name="expiryDate"
                          id="expiryDate"
                          onChange={changeHandler}
                        />
                      </div>

                      <div className="col-lg-12 col-md-6 col-sm-6 col-12 form-group clearfix">
                        <label for="fname" class="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          id="fname"
                          placeholder="Max 50 words"
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="col-lg-12 col-md-6 col-sm-6 col-12 form-group">
                        <label for="fname" class="form-label">
                          Tagline
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="excerpt"
                          id="fname"
                          placeholder="Max 100 words"
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="col-lg-12 col-12 form-group">
                        <label for="fname" class="form-label">
                          Share Your Story
                        </label>
                        <textarea
                          className="form-control"
                          name="story"
                          id="note"
                          placeholder="Minimum 200 words"
                          onChange={changeHandler}
                        ></textarea>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12 form-group">
                        <label for="formFileSm" class="form-label">
                          Upload photo that best defines your fundraiser
                          campaign
                        </label>
                        <input
                          class="form-control form-control-sm"
                          id="formFileSm"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </div>

                      <div className="row align-items-center">
                        <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                          <select
                            id="inputState"
                            class="form-select"
                            name="walletType"
                            value={value?.walletType}
                            onChange={changeHandler}
                          >
                            <option>Ethereum</option>
                            <option>Bitcoin</option>
                          </select>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5 col-5 ">
                          <input
                            type="text"
                            placeholder="Wallet Address"
                            className=" my-auto"
                            name="walletAddress"
                            value={value?.walletAddress}
                            onChange={changeHandler}
                            style={{ height: 35 }}
                          />
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                          <button
                            className="btn btn-primary submit-btn"
                            onClick={handleWalletSave}
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="mb-2">Linked Wallets</div>
                        {wallets?.map((wallet, index) => (
                          <p className="mb-0">
                            {wallet?.name}: {wallet?.walletAddress}{' '}
                            <span
                              className="text-danger c-p"
                              onClick={() => removeWallet(index)}
                            >
                              <i className="fa fa-trash"></i>
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="submit-area">
                    <button type="submit" className="theme-btn submit-btn">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default FundraiseRegisterPage;
