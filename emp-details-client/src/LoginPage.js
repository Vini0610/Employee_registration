import axios from 'axios';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import RegistrationPage from './RegistrationPage';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            authenticatedUser: false
        }
    }
    render() {
        if (this.state.authenticatedUser) {
            return <Redirect to="/employee" />
        }
        return (
            <div className="col-sm-8 mx-auto">
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={(values) => {
                        axios.post("http://localhost:4000/login", values).then((res) => {
                            if (res.data.success === true) {
                                this.setState({ authenticatedUser: true })
                            }
                        }).catch(
                            alert("Login failed")
                        );
                    }}
                >
                    {({ values, handleSubmit, handleChange }) => (
                        <form className="my-4" onSubmit={handleSubmit}>
                            <div className="form-inline my-2">
                                <label className="m-2 col-sm-2" htmlFor="userName"> User Email:</label>
                                <input type="text" className="form-control" name="email" onChange={handleChange}
                                    value={values.email} />
                            </div>
                            <div className="form-inline my-2">
                                <label className="m-2 col-sm-2" htmlFor="password"> Password:</label>
                                <input type="password" className="form-control" name="password" onChange={handleChange}
                                    value={values.password} />
                            </div>
                            <div className="my-4 form-inline">
                                <button type="submit" className="btn btn-primary col-sm-2 ml-10 mr-2"> Login </button>
                                <button type="reset" className="btn btn-secondary col-sm-2"> Cancel </button>
                            </div>
                            <div className="my-2">
                                <p> New User? <Link to="/registration">Register here </Link> </p>
                                {/* <p> New User? Register here </p> */}
                            </div>

                        </form>

                    )}

                </Formik>
            </div>
        );
    }
}

export default LoginPage;