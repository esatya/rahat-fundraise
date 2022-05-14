import { toast } from "react-toastify";
import React, { useState, Fragment } from "react";

import Logo from "../../images/logo.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import PageTitle from "../../components/pagetitle";
import Scrollbar from "../../components/scrollbar";

const FundraiseRegisterPage = (props) => {
  const [value, setValue] = useState({
    title: "",
    excerpt: "",
    story: "",
    target: "",
    expiryDate: "",
  });

  const [image, setImage] = useState(null);

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("excerpt", value.excerpt);
    formData.append("story", value.story);
    formData.append("target", value.target);
    formData.append("expiryDate", value.expiryDate);
    formData.append("image", image);

    try {
      const resData = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/campaign/add`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      ).then((res) => res.json());

      props.history.push("/profile");

      console.log({ resData });
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <Navbar Logo={Logo} />
      <PageTitle pageTitle={"Register"} pagesub={"Register"} />
      <div className="wpo-donation-page-area section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="wpo-donate-header">
                <h2>Register Here To Organize A Campaign</h2>
              </div>
              <div id="Donations" className="tab-pane">
                <form onSubmit={SubmitHandler}>
                  {/* <div className="wpo-donations-amount">
                    <h2>Select A Country</h2>
                  <div className="wpo-donations-amount">
                    <h2>Select a country</h2>
                    <select id="inputState" class="form-select">
                      <option selected>Choose...</option>
                      <option>Nepal</option>
                      <option>Nepal</option>
                      <option>Nepal</option>
                    </select>
                  </div> */}
                  <div className="wpo-donations-details">
                    <h2>Enter details of your campaign?</h2>
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
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                        <label for="fname" class="form-label">
                          Duration of your campaign
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="expiryDate"
                          id="name"
                          placeholder=""
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
                      <div className="col-lg-12 col-md-6 col-sm-6 col-12 form-group">
                        <label for="formFileSm" class="form-label">
                          Upload photo that best defines your fundraiser
                          campaign
                        </label>
                        <input
                          class="form-control form-control-sm"
                          id="formFileSm"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </div>
                      {/* <div class="mb-3">
                                                <label for="formFileSm" class="form-label">Small file input example</label>
                                                <input class="form-control form-control-sm" id="formFileSm" type="file">
                                            </div> */}
                    </div>
                  </div>
                  {/* <div className="wpo-doanation-payment">
                                        <h2>Choose Your Payment Method</h2>
                                        <div className="wpo-payment-area">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="wpo-payment-option" id="open4">
                                                        <div className="wpo-payment-select">
                                                            <ul>
                                                                <li className="addToggle">
                                                                    <input id="add" type="radio" name="payment" value="30" />
                                                                    <label htmlFor="add">Payment By Card</label>
                                                                </li>
                                                                <li className="removeToggle">
                                                                    <input id="remove" type="radio" name="payment" value="30" />
                                                                    <label htmlFor="remove">Offline Donation</label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div id="open5" className="payment-name">
                                                            <ul>
                                                                <li className="visa"><input id="1" type="radio" name="size" value="30" />
                                                                    <label htmlFor="1"><img src={pimg} alt="" /></label>
                                                                </li>
                                                                <li className="mas"><input id="2" type="radio" name="size" value="30" />
                                                                    <label htmlFor="2"><img src={pimg2} alt="" /></label>
                                                                </li>
                                                                <li className="ski"><input id="3" type="radio" name="size" value="30" />
                                                                    <label htmlFor="3"><img src={pimg3} alt="" /></label>
                                                                </li>
                                                                <li className="pay"><input id="4" type="radio" name="size" value="30" />
                                                                    <label htmlFor="4"><img src={pimg4} alt="" /></label>
                                                                </li>
                                                            </ul>
                                                            <div className="contact-form form-style">
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-12 col-12">
                                                                        <label>Card holder Name</label>
                                                                        <input type="text" placeholder="" name="name" />
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-12 col-12">
                                                                        <label>Card Number</label>
                                                                        <input type="text" placeholder="" id="card" name="card" />
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-12 col-12">
                                                                        <label>CVV</label>
                                                                        <input type="text" placeholder="" name="CVV" />
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-12 col-12">
                                                                        <label>Expire Date</label>
                                                                        <input type="text" placeholder="" name="date" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
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
