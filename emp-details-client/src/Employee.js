import React, { Component } from 'react';
import axios from 'axios';
import EmpForm from './EmpForm';
import { Formik } from 'formik';
let updateDataIndex;

class Employee extends Component {
    constructor() {
        super();
        this.state = {
            empDetails: {
                id: '',
                firstName: '',
                skill: '',
                team: ''
            },
            myDataLength: false,
            myData: [],
            isUpdateNeeded: false
        }
    }
    componentDidMount() {
        this.refresh();
    }
    refresh() {
        this.getData().then((response) => {
            this.setState({
                myData: response.employees, myDataLength: true
            })
            //console.log(this.state.myData);
        })
    }
    async getData() {
        let response =
            await axios.get("http://localhost:4000/employee/get")

        return response.data
    }
    addItem = (value) => {
        // e.preventDefault();
        // console.log("Button is clicked")
        axios.post("http://localhost:4000/employee/create", value)
            .then(
                () => {
                    this.refresh();
                    this.setState({
                        empDetails: {
                            id: '',
                            firstName: '',
                            skill: '',
                            team: ''
                        }
                    })
                }).catch();
        // let myDataDetails = this.state.myData;
        // // console.log(myDataDetails)
        // myDataDetails.push(this.state.empDetails)
        // console.log(this.state.empDetails);

        //console.log(this.state.myData)
    }

    deleteItem = (id) => {
        // console.log("I am clicked");
        //this.state.myData.splice(index, 1);
        axios.delete(`http://localhost:4000/employee/remove/${id}`)
            .then(() => {
                this.refresh();
                this.setState({
                    empDetails: {
                        id: '',
                        firstName: '',
                        skill: '',
                        team: ''
                    }
                });
                if (this.state.myData.length === 0) {
                    this.setState({ myDataLength: false })
                }
            }).catch();
        // let myDataDetails = this.state.myData;
        // myDataDetails.splice(index, 1)
        // this.setState({
        //     myData: myDataDetails, empDetails: {
        //         id: '',
        //         firstName: '',
        //         skill: '',
        //         team: ''
        //     }
        // })

        // console.log(this.state.myData);
    }
    editItem = (id) => {
        updateDataIndex = id;
        axios.get(`http://localhost:4000/employee/get/${id}`)
            .then((response) => {
               // console.log(response);
                this.setState({
                    empDetails: {
                        id: response.data.employee.id,
                        firstName: response.data.employee.firstName,
                        skill: response.data.employee.skill,
                        team: response.data.employee.team
                    }, isUpdateNeeded: true
                })
            });
        // axios.put(`http://localhost:4000/employee/update/${id}`)

        // let myDataDetails = this.state.myData[index];


    }
    updateItem = (value) => {
        //e.preventDefault();
        console.log(value);
        axios.put(`http://localhost:4000/employee/update/${updateDataIndex}`, value)
            .then(() => {
                //console.log(this.state.empDetails);
                this.refresh();
                this.setState({
                    empDetails: {
                        id: '',
                        firstName: '',
                        skill: '',
                        team: ''
                    }, myDataLength: true, isUpdateNeeded: false
                });
            })
    }

    cancelUpdate = () => {
        this.setState({
            empDetails: {
                id: '',
                firstName: '',
                skill: '',
                team: ''
            }, isUpdateNeeded: false
        })
    }

    render() {
        return (
            <div className="container my-2">
                <h2 className="my-2"> Employee Details</h2>
                <Formik
                    enableReinitialize = {true}
                    validateOnMount = {true}
                    initialValues={{
                        id: this.state.empDetails.id,
                        firstName: this.state.empDetails.firstName,
                        skill: this.state.empDetails.skill,
                        team: this.state.empDetails.team
                    }}
                    // initialTouched?: FormikTouched<Values></Values>
                    validate={values => {
                        const errors = {};
                        if (!values.id) {
                            errors.id = 'This is Required';
                        } else if (values.id === NaN) {
                            errors.id = 'Only number is allowed';
                        } else if (!values.firstName) {
                            errors.firstName = 'This is Required';
                        } else if (!values.skill) {
                            errors.skill = 'This is Required';
                        } else if (!values.team) {
                            errors.team = 'This is Required';
                        }
                        return errors;
                    }}
                    onSubmit = {(values)=> {
                        if(this.state.isUpdateNeeded == true){
                            this.updateItem(values);
                        } else {
                            this.addItem(values);
                        }
                    }}
                >
                    {({
                        values, errors, touched, handleChange, isValid, handleSubmit}) => (
                            <form className="form-inline" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="m-2" htmlFor="id"> Emp Id:</label>
                                    <input type="text" className="form-control" name="id" onChange={handleChange}
                                        value={values.id} />
                                    {errors.id && touched.id && errors.id}
                                </div>
                                <div className="form-group">
                                    <label className="m-2" htmlFor="firstName"> First Name:</label>
                                    <input type="text" className="form-control" name="firstName" onChange={handleChange}
                                        value={values.firstName} />
                                    {errors.firstName && touched.firstName && errors.firstName}
                                </div>
                                <div className="form-group">
                                    <label className="m-2" htmlFor="skill"> Skill: </label>
                                    <input type="text" className="form-control" name="skill" onChange={handleChange}
                                        value={values.skill} />
                                    {errors.skill && touched.skill && errors.skill}
                                </div>
                                <div className="form-group">
                                    <label className="m-2" htmlFor="team"> Team:</label>
                                    <input type="text" className="form-control" name="team" onChange={handleChange}
                                        value={values.team} />
                                    {errors.team && touched.team && errors.team}
                                </div>
                                {this.state.isUpdateNeeded ?
                                    <div className="my-2">
                                        <button className="btn btn-success mr-2" type="submit"> Update </button>
                                        <button className="btn btn-danger" onClick={this.cancelUpdate}> Cancel </button>
                                    </div> :
                                    <div className="my-2">
                                        <button className="btn btn-primary" disabled={!isValid} type="submit">Add</button>
                                    </div>
                                }
                            </form>
                        )}

                </Formik>
                {this.state.myDataLength ? <EmpForm formData={this.state.myData} deleteItem={this.deleteItem} editItem={this.editItem}></EmpForm> : null}
                {/* <EmpForm></EmpForm> */}
            </div>

        )
    }
}

export default Employee;