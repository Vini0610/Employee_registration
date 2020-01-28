import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Formik } from 'formik';

class RegistrationPage extends Component {
    render() {
        return (
                <Formik
                initialValues = {{
                    userName: '',
                    email: '',
                    password: ''
                }}
                onSubmit = {(values) => {
                    axios.post("http://localhost:4000/user/create", values).then().catch();
                }}
                >
                    { ({values, handleSubmit, handleChange}) =>(
                <form className="my-4" onSubmit={handleSubmit}>
                    <h3> RegistrationPage </h3>
                    <div className="form-inline my-2 col-sm-8 mx-auto">
                        <label className="m-2 col-sm-4" htmlFor="userName"> User Name:</label>
                        <input type="text" className="form-control" name="userName" onChange={handleChange}
                                        value={values.userName}/>
                    </div>
                    <div className="form-inline my-2 col-sm-8 mx-auto">
                        <label className="m-2 col-sm-4" htmlFor="email"> E-mail:</label>
                        <input type="text" className="form-control" name="email" onChange={handleChange}
                                        value={values.email}/>
                    </div>
                    <div className="form-inline my-2 col-sm-8 mx-auto">
                        <label className="m-2 col-sm-4" htmlFor="password"> Password:</label>
                        <input type="password" className="form-control" name="password" onChange={handleChange}
                                        value={values.password}/>
                    </div>
                    <div className="my-4">
                        <button type="submit" className="btn btn-primary mx-2" > Submit </button>
                        <button type="reset" className="btn btn-secondary mx-2"> Cancel </button>
                        <p> Existing user? <Link to="/"> Login here </Link></p>
                    </div>
                </form>
                )}
                </Formik>
        );
    }
}

export default RegistrationPage;