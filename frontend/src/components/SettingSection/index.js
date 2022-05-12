import React from "react";
import {
  Tab,
  Row,
  Col,
  Nav,
  Form,
  Button,
  FormControl,
  FloatingLabel,
} from "react-bootstrap";

function SettingsPage() {
  return (
    <>
      <section className="mt-5 mb-5">
        <div className="container">
          <div className="tab-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <Tab.Container defaultActiveKey="profile">
                    <Row>
                      <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item style={{ cursor: "pointer" }}>
                            <Nav.Link eventKey="profile">Profile</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={1} className="vl"></Col>
                      <Col sm={6}>
                        <Tab.Content className="ml-3">
                          <Tab.Pane eventKey="profile">
                            <h3 className="mb-4">Profile Settings</h3>
                            <Form>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <FormControl
                                      placeholder="Enter Your Username"
                                      aria-label="Username"
                                      aria-describedby="basic-addon2"
                                      name="username"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                  >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                      type="email"
                                      name="email"
                                      placeholder="name@example.com"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <FormControl
                                      placeholder="Enter Your Phone Number"
                                      aria-label="phone"
                                      aria-describedby="basic-addon2"
                                      name="phone"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                  >
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                      placeholder="Enter Your Address"
                                      aria-label="Address"
                                      aria-describedby="basic-addon2"
                                      name="address"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <FloatingLabel controlId="floatingTextarea2">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  placeholder="Enter Your Bio Here. "
                                  style={{ height: "100px" }}
                                  name="bio"
                                />
                              </FloatingLabel>

                              <Row>
                                <Col>
                                  <Button
                                    className="mt-3"
                                    variant="primary"
                                    type="submit"
                                  >
                                    Submit
                                  </Button>
                                </Col>
                              </Row>
                            </Form>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                      <Col sm={2}>
                        <Row>
                          <Col>
                            <Form.Group
                              className="my-3 text-center"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label className="mr-3">
                                <small>Upload your Profile picture</small>
                                <div className="text-center">
                                  <img
                                    src="https://assets.rumsan.com/rumsan-group/zoonft-adoption-6.jpg"
                                    alt=""
                                    style={{
                                      objectFit: "cover",
                                      marginTop: 10,
                                      marginBottom: 20,
                                      height: 120,
                                      width: 120,
                                      borderRadius: "50%",
                                    }}
                                  />
                                </div>
                              </label>
                              <input className="d-none" type="file" />
                              <Button
                                style={{
                                  fontSize: "14px",
                                  padding: "10px 20px",
                                }}
                              >
                                Upload
                              </Button>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group
                              className="my-3 text-center"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label className="mr-3">
                                <small>Upload your Cover picture</small>
                                <div className="text-center">
                                  <img
                                    src="https://assets.rumsan.com/rumsan-group/zoonft-adoption-6.jpg"
                                    alt=""
                                    style={{
                                      objectFit: "cover",
                                      marginTop: 10,
                                      marginBottom: 20,
                                      height: 120,
                                      width: 120,
                                      borderRadius: "50%",
                                    }}
                                  />
                                </div>
                              </label>
                              <input className="d-none" type="file" />
                              <Button
                                style={{
                                  fontSize: "14px",
                                  padding: "10px 20px",
                                }}
                              >
                                Upload
                              </Button>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SettingsPage;
