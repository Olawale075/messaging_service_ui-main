import React from 'react'
import Protected from "./partials/Protected";
import * as ReactBootStrap from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import userService, { getUser, USER_URL } from "../api/userService";
import swal from 'sweetalert';
const InitialValue = {actionName : '', id : null}


const ListUser = () => {
  
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState(InitialValue)
  const [appUser, setAppUsers] = useState(null);
  const [showDelete, setShowDelete] = useState(false)
  const [showAddConfig, setShowAddConfig] = useState(false);
  const [pageNumber, setPageNumber] = useState(0)
  const [content, setContent] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const handleCloseAddConfig = () => setShowAddConfig(false);
  const handleShowAddConfig = () => {
   
    setValues(InitialValue)
    setIsEdit(false)
    setShowAddConfig(true)
  };  
 


  const getAllUsers = () => {
    userService.getAllUser().then((response) => {
      setAppUsers(response.data)
        console.log(response.content);
    }).catch(error =>{
        console.log(error);
    })
}
useEffect(() => {

  getAllUsers();
}, [])
// //   useEffect(() => {
// //     const fetchAPI = async () => {
// //         try{
// //             const Users = await getUser()
// //             console.log(Users)
// //             setAppUsers(Users.content)
// //             setContent(Users)
// //             setLoading(false)
// //         }catch(err) {

// //         }
// //     }
//      getAllUsers();
// //   }, []);
// // // 

  const handlePagination = (number) => {
    setLoading(true)
    setPageNumber(number)
    const getAllUsers = () => {
      userService.getAllUser(number).then((response) => {
        setAppUsers({response:data})
          console.log(response.content);
      }).catch(error =>{
          console.log(error);
      })
  }
  
  }
  
  return ( <Protected>
      <Button variant="dark" href="/add-User" title="Add Variable">
            <FaPlus />
        </Button>
      <ReactBootStrap.Table striped bordered hover>
          <table className="table table-bordered table-striped">
          
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Last Name </th>
              <th>First Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>  
          {Array.isArray(appUser)?
          appUser.map((AppUsers, index) =>
             {
        return(
          <tr key={index+1}>
                    <td>{AppUsers.id}</td>
                    <td>{AppUsers.first}</td>
                    <td>{AppUsers.firstname}</td>
                    <td>{AppUsers.email}</td>
                    <td>{AppUsers.mobile}</td>
                    <td>{AppUsers.username}</td>
                  
                </tr>
        
      )}):null}
          
          </tbody></table>
        </ReactBootStrap.Table>
        <Pagination>
        {content && !content.first ? (
          <Pagination.Item onClick={() => handlePagination(pageNumber-1)}>
          Prev
        </Pagination.Item>
          ): ''}
          
          <Pagination.Item >
            {pageNumber+1}
          </Pagination.Item>
          {content && !content.last ? (
          <Pagination.Item onClick={() => handlePagination(pageNumber+1)}>
          Next
          </Pagination.Item>
          ): ''}
        </Pagination>
        
    </Protected>)
}

export default ListUser