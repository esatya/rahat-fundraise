import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom'
import Causes from '../../api/cause'
import { useParams } from 'react-router-dom'
import pimg from '../../images/checkout/img-1.png'
import pimg2 from '../../images/checkout/img-2.png'
import pimg3 from '../../images/checkout/img-3.png'
import pimg4 from '../../images/checkout/img-4.png'

import cmt1 from '../../images/blog-details/comments-author/img-1.jpg'
import cmt2 from '../../images/blog-details/comments-author/img-2.jpg'
import cmt3 from '../../images/blog-details/comments-author/img-3.jpg'




const CauseTabs = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const { id } = useParams()

    const CauseDetails = Causes.find(item => item.id === id)



    return (
        <div>
            <div className="wpo-case-details-tab">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Description
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >

                            Donations
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >

                            Comments
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
            <div className="wpo-case-details-text">
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <div className="wpo-case-content">
                                    <div className="wpo-case-text-top">
                                        <h2>{CauseDetails.cTitle}</h2>
                                        <div className="progress-sub">
                                            <div className="progress-section">
                                                <div className="process">
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{ width: `${CauseDetails.process}%` }}>
                                                            <div className="progress-value"><span>{CauseDetails.process}</span>%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul>
                                                <li><span>Raised:</span> ${CauseDetails.Raised}</li>
                                                <li><span>Goal:</span> ${CauseDetails.Goal}</li>
                                                <li><span>Donar:</span> 380</li>
                                            </ul>
                                        </div>
                                        <div className="case-b-text">
                                            <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.</p>
                                            <p>These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.</p>
                                            <p>But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures.</p>
                                        </div>
                                        <div className="case-bb-text">
                                            <h3>We want to ensure the education for the kids.</h3>
                                            <p>These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure.</p>
                                            <ul>
                                                <li>The wise man therefore always holds in these matters.</li>
                                                <li>In a free hour, when our power of choice and when nothing.</li>
                                                <li>Else he endures pains to avoid worse pains.</li>
                                                <li>We denounce with righteous indignation and dislike men. </li>
                                                <li>Which is the same as saying through.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <div id="Donations" className="tab-pane">
                                    <div className="wpo-donations-details">
                                        <div className="row">
                                            <table>
                                                <tr>
                                                    <th>Profile Picture</th>
                                                    <th>Wallet Address</th>
                                                    <th>Amt</th>
                                                    <th>Date</th>
                                                    <th>TXN</th>
                                                </tr>
                                                <hr style={{height:'2px',width:'417%', color:'#217ec2'}}/>
                                                <tr>
                                                    <td><img src=''/></td>
                                                    <td>195434531234235235</td>
                                                    <td>$500</td>
                                                    <td>02-May-22</td>
                                                    <td>1223</td>
                                                </tr>
                                                <tr>
                                                    <td><img src=''/></td>
                                                    <td>195434531234235235</td>
                                                    <td>$500</td>
                                                    <td>02-May-22</td>
                                                    <td>1223</td>
                                                </tr>
                                                <tr>
                                                    <td><img src=''/></td>
                                                    <td>195434531234235235</td>
                                                    <td>$500</td>
                                                    <td>02-May-22</td>
                                                    <td>1223</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <div id="Comments" className="tab-pane wpo-blog-single-section">
                                    <div className="comments-area">
                                        <div className="comments-section">
                                            <h3 className="comments-title">Comments</h3>
                                            <ol className="comments">
                                                <li className="comment even thread-even depth-1" id="comment-1">
                                                    <div id="div-comment-1">
                                                        <div className="comment-theme">
                                                            <div className="comment-image"><img src={cmt1} alt="" /></div>
                                                        </div>
                                                        <div className="comment-main-area">
                                                            <div className="comment-wrapper">
                                                                <div className="comments-meta">
                                                                    <h4>John Abraham <span className="comments-date">Octobor 28,2021 At 9.00am</span></h4>
                                                                </div>
                                                                <div className="comment-area">
                                                                    <p>I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, </p>
                                                                    <div className="comments-reply">
                                                                        <Link className="comment-reply-link" to="/cause-single/1"><i className="fa fa-reply" aria-hidden="true"></i><span> Reply</span></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul className="children">
                                                        <li className="comment">
                                                            <div>
                                                                <div className="comment-theme">
                                                                    <div className="comment-image"><img src={cmt2} alt="" /></div>
                                                                </div>
                                                                <div className="comment-main-area">
                                                                    <div className="comment-wrapper">
                                                                        <div className="comments-meta">
                                                                            <h4>Lily Watson <span className="comments-date">Octobor 28,2021 At 9.00am</span></h4>
                                                                        </div>
                                                                        <div className="comment-area">
                                                                            <p>I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, </p>
                                                                            <div className="comments-reply">
                                                                                <Link className="comment-reply-link" to="/cause-single/1"><span><i className="fa fa-reply" aria-hidden="true"></i> Reply</span></Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <ul>
                                                                <li className="comment">
                                                                    <div>
                                                                        <div className="comment-theme">
                                                                            <div className="comment-image"><img src={cmt3} alt="" /></div>
                                                                        </div>
                                                                        <div className="comment-main-area">
                                                                            <div className="comment-wrapper">
                                                                                <div className="comments-meta">
                                                                                    <h4>John Abraham <span className="comments-date">Octobor 28,2021 At 9.00am</span></h4>
                                                                                </div>
                                                                                <div className="comment-area">
                                                                                    <p>I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, </p>
                                                                                    <div className="comments-reply">
                                                                                        <Link className="comment-reply-link" to="/cause-single/1"><span><i className="fa fa-reply" aria-hidden="true"></i> Reply</span></Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="comment-respond">
                                        <h3 className="comment-reply-title">Leave a Comment</h3>
                                        <form method="post" id="commentform" className="comment-form" onSubmit={SubmitHandler}>
                                            <div className="form-inputs">
                                                <input placeholder="Name" type="text" />
                                                <input placeholder="Email" type="email" />
                                                <input placeholder="Website" type="url" />
                                            </div>
                                            <div className="form-textarea">
                                                <textarea id="comment" placeholder="Write Your Comments..."></textarea>
                                            </div>
                                            <div className="form-submit">
                                                <input id="submit" value="Reply" type="submit" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
}

export default CauseTabs;