import React, { useContext, useEffect, useState } from 'react';
import {
  Tab,
  Row,
  Col,
  Nav,
  Form,
  Button,
  FormControl,
  FloatingLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import UserContext from '../../context/user-context';

function SettingsPage(props) {
  const [newImage, setNewImage] = useState(null);
  const [user, setUser] = React.useState({
    name: '',
    phone: '',
    address: '',
    bio: '',
    imageUrl: '',
    email: '',
    alias: '',
    isLoading: false,
  });
  const { user: contextUser, refreshLoggedInUser } = useContext(UserContext);

  const handleFileChange = (event) => {
    setNewImage(event.target.files[0]);
  };

  useEffect(() => {
    if (contextUser?.isLoggedIn && contextUser?.data?.token) {
      setUser((previous) => {
        return {
          ...previous,

          name: contextUser?.data?.name || '',
          phone: contextUser?.data?.phone || '',
          address: contextUser?.data?.address || '',
          bio: contextUser?.data?.bio || '',
          imageUrl: contextUser?.data?.image || '',
          email: contextUser?.data?.email || '',
          alias: contextUser?.data?.alias || '',
        };
      });
    }
  }, [contextUser?.data?.token]);

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: 'errorMessage',
    }),
  );

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (validator.allValid()) {
      setUser((previous) => {
        return {
          ...previous,
          isLoading: true,
        };
      });
      const formData = new FormData();

      formData.append('name', user.name);
      formData.append('phone', user.phone);
      formData.append('address', user.address);
      formData.append('bio', user.bio);
      if (contextUser.data?.email !== user.email) {
        formData.append('email', user.email.trim());
      }
      if (contextUser.data?.alias !== user.alias) {
        formData.append('alias', user.alias);
      }
      if (newImage) {
        formData.append('image', newImage);
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/update-by-id`,
          {
            method: 'POST',
            body: formData,

            headers: {
              Authorization: `Bearer ${contextUser?.data?.token}`,
            },
          },
        );
        const updatedUser = await response.json();
        if (updatedUser?.ok) {
          setUser({
            name: updatedUser?.data?.name || '',
            phone: updatedUser?.data?.phone || '',
            address: updatedUser?.data?.address || '',
            bio: updatedUser?.data?.bio || '',
            imageUrl: updatedUser?.data?.image || '',
            alias: updatedUser?.data?.alias || '',
            email: updatedUser?.data?.email || '',
            isLoading: false,
          });
          refreshLoggedInUser(updatedUser?.data);
          setNewImage(null);
          validator.hideMessages();
          toast.success('Profile Updated successfully!');
        } else {
          throw new Error(updatedUser?.msg);
        }
      } catch (error) {
        toast.error(error?.message || 'Something went wrong');
        setUser((previous) => {
          return {
            ...previous,
            isLoading: false,
          };
        });
      }
    } else {
      validator.showMessages();
      toast.error('Empty field is not allowed!');
    }
  };

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
                          <Nav.Item style={{ cursor: 'pointer' }}>
                            <Nav.Link eventKey="profile">Profile</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={1} className="vl"></Col>
                      <Col sm={6}>
                        <Tab.Content className="ml-3">
                          <Tab.Pane eventKey="profile">
                            <h3 className="mb-4">Profile Settings</h3>
                            <Form onSubmit={submitForm}>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <FormControl
                                      placeholder="Full Name"
                                      aria-label="Username"
                                      aria-describedby="basic-addon2"
                                      name="name"
                                      value={user.name}
                                      onChange={changeHandler}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12} md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <FormControl
                                      placeholder="Email"
                                      aria-label="Email"
                                      aria-describedby="basic-addon2"
                                      name="email"
                                      value={user.email}
                                      onChange={changeHandler}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <FormControl
                                      placeholder="Username"
                                      aria-label="Username"
                                      aria-describedby="basic-addon2"
                                      name="alias"
                                      value={user.alias}
                                      onChange={changeHandler}
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
                                      onChange={changeHandler}
                                      value={user.phone}
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
                                      value={user.address}
                                      onChange={changeHandler}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Bio</Form.Label>
                                <FloatingLabel controlId="floatingTextarea2">
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Enter Your Bio Here. "
                                    style={{ height: '100px' }}
                                    name="bio"
                                    onChange={changeHandler}
                                    value={user.bio}
                                  />
                                </FloatingLabel>
                              </Form.Group>

                              <Row>
                                <Col>
                                  <Button
                                    className="mt-3"
                                    variant="primary"
                                    type="submit"
                                    disabled={user.isLoading}
                                  >
                                    Save
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
                                {/* <small>Upload your Profile picture</small> */}
                                <div className="text-center">
                                  <img
                                    src={
                                      newImage
                                        ? URL.createObjectURL(newImage)
                                        : `${process.env.REACT_APP_API_BASE_URL}${user.imageUrl}`
                                    }
                                    alt=""
                                    style={{
                                      objectFit: 'cover',
                                      marginTop: 10,
                                      marginBottom: 20,
                                      height: 120,
                                      width: 120,
                                      borderRadius: '50%',
                                    }}
                                  />
                                </div>
                              </label>
                              <label for="profile-upload">
                                <div
                                  style={{
                                    fontSize: '14px',
                                    padding: '10px 20px',
                                    background: '#0d6efd',
                                    color: 'white',
                                    borderRadius: '5px',
                                  }}
                                >
                                  Choose Profile
                                </div>
                              </label>
                              <input
                                id="profile-upload"
                                className="d-none"
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleFileChange}
                              />
                            </Form.Group>
                          </Col>
                          {/* <Col>
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
                          </Col> */}
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
