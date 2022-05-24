import { toast } from 'react-toastify';
import React, { useState, Fragment, useEffect, useContext } from 'react';

import Logo from '../../images/logo.png';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import PageTitle from '../../components/pagetitle';
import Scrollbar from '../../components/scrollbar';
import UserContext from '../../context/user-context';
import dayjs from 'dayjs';

const EditFundraise = (props) => {
  const [campaign, setCampaign] = useState({});

  const [value, setValue] = useState({
    title: campaign?.title,
    excerpt: campaign?.excerpt,
    story: campaign?.story,
    target: campaign?.target,
    expiryDate: campaign?.expiryDate,
    wallets: campaign?.wallets || [],
    walletType: 'Ethereum',
    walletAddress: '',
  });
  const [image, setImage] = useState(null);

  const campaignId = props.match.params.id;

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchSingleCampaign = async () => {
      try {
        const resData = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/campaign/get-by-id/${campaignId}`,
        ).then((res) => res.json());

        setCampaign(resData.data);

        setValue({
          title: resData.data.title,
          excerpt: resData.data.excerpt,
          story: resData.data.story,
          target: resData.data.target,
          expiryDate: resData.data.expiryDate,
          wallets: resData.data.wallets || [],
        });
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (campaignId && user?.isLoggedIn && user?.data?.token) {
      fetchSingleCampaign();
    }
  }, [user, campaignId]);

  const handleWalletSave = (event) => {
    event.preventDefault();

    setValue((previous) => {
      return {
        ...previous,
        wallets: previous?.wallets?.concat({
          name: previous?.walletType || 'Ethereum',
          walletAddress: previous?.walletAddress,
        }),
        walletType: 'Ethereum',
        walletAddress: '',
      };
    });
  };

  const removeWallet = (index) => {
    const newWallets = value.wallets?.filter((item, idx) => index !== idx);
    setValue((previous) => {
      return {
        ...previous,
        wallets: newWallets,
      };
    });
  };

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (value.wallets?.length <= 0) {
      toast.info('Please have at least one wallet.');
      return;
    }

    const formData = new FormData();
    formData.append('title', value.title);
    formData.append('excerpt', value.excerpt);
    formData.append('story', value.story);
    formData.append('target', value.target);
    formData.append('expiryDate', value.expiryDate);
    formData.append('image', image);
    formData.append('wallets', JSON.stringify(value.wallets));

    try {
      const resData = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/campaign/${campaignId}/update`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        },
      ).then((res) => res.json());

      props.history.push(`/fundraise/${campaignId}`);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <Navbar Logo={Logo} />
      <PageTitle pageTitle={'Edit Campaign'} pagesub={'Edit Campaign'} />
      <div className="wpo-donation-page-area section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="wpo-donate-header">
                <h2>Edit your campaign</h2>
              </div>
              <div id="Donations" className="tab-pane">
                <form onSubmit={SubmitHandler}>
                  <div className="wpo-donations-details">
                    <h2>Enter details of your campaign</h2>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                        <label for="fname" class="form-label">
                          Enter an amount
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="target"
                          id="fname"
                          placeholder=""
                          value={value.target}
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                        <label for="expiryDate" class="form-label">
                          Campaign End Date
                        </label>
                        <input
                          type="date"
                          min={dayjs().add('1', 'day').format('YYYY-MM-DD')}
                          className="form-control"
                          name="expiryDate"
                          id="expiryDate"
                          placeholder=""
                          value={value.expiryDate}
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
                          value={value.title}
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
                          value={value.excerpt}
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
                          value={value.story}
                          onChange={changeHandler}
                        ></textarea>
                      </div>
                      <div>
                        <img
                          height={200}
                          width="auto"
                          src={`${process.env.REACT_APP_API_BASE_URL}${campaign.image}`}
                          alt="campaign"
                        />
                      </div>
                      <div className="col-lg-12 col-md-6 col-sm-6 col-12 form-group">
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
                        {value?.wallets?.map((wallet, index) => (
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
                      Save
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
export default EditFundraise;
