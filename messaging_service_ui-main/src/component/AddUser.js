import React, {useState, useEffect} from 'react'
import { Container, Spinner } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import userService from '../api/userService';
import Layout from './partials/Layout';
import Protected from "./partials/Protected";

const AddUser = () => {

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true);
  


    const save = (e) => {
        e.preventDefault();

        const user = {firstname,username,mobile,email, lastname}
 userService.createUser(user).then((data) =>{

            }).catch(error => {
                console.log(error)
                alert('An error occurred:'+ error)
            })

    }

    // useEffect(() => {

    //     EmployeeService.getEmployeeById(id).then((response) =>{
    //         setFirstName(response.data.firstName)
    //         setLastName(response.data.lastName)
    //         setEmailId(response.data.emailId)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }, [])

    const title = () => {

      
            return <h2 className = "text-center">Add User</h2>
        }
    

    return (
        
     <Protected>
            <Container>
        
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> First Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter first name"
                                        name = "firstName"
                                        className = "form-control"
                                        value = {firstname}
                                        onChange = {(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Last Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter last name"
                                        name = "lastName"
                                        className = "form-control"
                                        value = {lastname}
                                        onChange = {(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email :</label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter email"
                                        name = "email"
                                        className = "form-control"
                                        value = {email}
                                        onChange = {(e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Mobile Number :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Mobile"
                                        name = "Mobile"
                                        className = "form-control"
                                        value = {mobile}
                                        onChange = {(e) => setMobile(e.target.value)}
                                    >
                                    </input>
                                    <div className = "form-group mb-2">
                                    <label className = "form-label"> Username :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter User Name"
                                        name = "username"
                                        className = "form-control"
                                        value = {username}
                                        onChange = {(e) => setUsername(e.target.value)}
                                    >
                                    </input>
                                </div>
                                </div>
                                <button className = "btn btn-success" style = {{marginRight:"10px"}} href="/home"onClick = {(e) => save(e)} >Submit </button>
                                
                                <Link to="/home" className="btn btn-danger"> Cancel </Link>
                            </form>

                        </div>          
                    </div>
                </div>

           </div>
           </Container>
      </Protected>
       
    )
}

export default AddUser