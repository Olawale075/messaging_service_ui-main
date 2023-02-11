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
import userService, { USER_URL, getUser, USER_BASE_REST_API_URL } from "../api/userService";
import swal from 'sweetalert';
import First from './user';
const InitialValue = { userName: '', id: null }

const ListUser = () => {
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState(InitialValue)
  const [AppUsers, setAppUsers] = useState([]);
  const [showDelete, setShowDelete] = useState(false)
  const [showAddConfig, setShowAddConfig] = useState(false);
  const [pageNumber, setPageNumber] = useState(0)
  const [content, setContent] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [username, setUsername] = useState('')
  const handleCloseAddConfig = () => setShowAddConfig(false);
  const handleShowAddConfig = () => {

    setValues(InitialValue)
    setIsEdit(false)
    setShowAddConfig(true)
  };
  const handleAddVariable = () => {
    fetch(`${USER_BASE_REST_API_URL}`, {
      method: "POST",
      body: JSON.stringify({ userName: values.userName }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          setShowAddConfig(false)
          swal("Variable Created", data.message, "success");
          setAppUsers([...AppUsers, data.data])
        }
      })
      .catch((err) => console.log(err));
    setValues(InitialValue)
  }

  const save = (e) => {
    e.preventDefault();

    const user = { firstname, username, mobile, email, lastname }
    userService.createUser(user).then((data) => {
    }).catch(error => {
      console.log(error)
      alert('An error occurred:' + error)
    })


  }
  useEffect(() => {

    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDeleteModal = (data) => {
    setShowDelete(true)
    setValues(data)

  }
  const handleDelete = () => {
    fetch(`${USER_BASE_REST_API_URL}/${values.id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        setShowDelete(false)
        setAppUsers(AppUsers.filter(AppUser => {
          return AppUser.id !== values.id
        }))
        swal("", 'variable deleted successfully', "success");
      })
      .catch((err) => console.log(err));
  }

  const getUser = (page = 0, size = 50) => {

    return (fetch(`http://localhost:8082/api/user?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setAppUsers(data.data.content)
        console.log(data.data);
        setLoading(false)

      }
      ).catch((err) => {
        console.log(err.message);
      }))
  }
  const handleUpdateVariable = data => {
    setIsEdit(true)
    setValues(data)
    setShowAddConfig(true)
  }
  const handleUpdate = () => {
    console.log(values)
    fetch(`${USER_BASE_REST_API_URL}/${values.id}`, {
      method: "PUT",
      body: JSON.stringify({ lastname: values.lastname }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setShowAddConfig(false)
          swal("", data.message, "success");
console.log(data);
          setAppUsers(AppUsers.map(AppUser => {
            if (AppUser.id === values.id) {
              return { ...AppUser, userName: data.data.content }
            }
            return AppUser
          }))
        }
      })
      .catch((err) => console.log(values));
  }
  const handlePagination = (number) => {
    setLoading(true)
    setPageNumber(number)

    const fetchAPI = async () => {
      try {
        const data = await getUser()
        setAppUsers(data.content)
        console.log(data.content);

        setLoading(false)
        setLoading(false)
      } catch (err) {

      }
    }

  }

  return (<Protected>
    <div className="mb-3 text-end">
      <Button variant="dark" onClick={handleShowAddConfig} title="Add Variable">
        <FaPlus />
      </Button>
    </div>
    <Button variant="dark" href="/add-User" title="Add Variable">
      <FaPlus />
    </Button>
    <ReactBootStrap.Table striped bordered hover>
      <First />
      <thead>
        <tr className="text-center">
          <th>#</th>
          <th>Last Name </th>
          <th>First Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Func</th>
        </tr>
      </thead>
      <tbody> {loading && <Spinner animation="grow" className="m-3" />}
        {
          AppUsers && AppUsers.map((AppUser, index) => (
            <tr className="text-center" key={AppUser.id}>
              <td>{index + 1}</td>
              <td>{AppUser.lastname}</td>
              <td>{AppUser.firstname}</td>
              <td>{AppUser.email}</td>
              <td>{AppUser.mobile}</td>
              <td>
                <Button className='mx-2' variant="outline-dark" onClick={e => handleUpdateVariable(AppUser)}>Edit</Button>
                <Button variant="dark" onClick={e => handleDeleteModal(AppUser)}>Delete</Button>
              </td>

            </tr>
          ))}
      </tbody>

    </ReactBootStrap.Table>
    <Pagination>
      {content && !content.first ? (
        <Pagination.Item onClick={() => handlePagination(pageNumber - 1)}>
          Prev
        </Pagination.Item>
      ) : ''}

      <Pagination.Item >
        {pageNumber + 1}
      </Pagination.Item>
      {content && !content.last ? (
        <Pagination.Item onClick={() => handlePagination(pageNumber + 1)}>
          Next
        </Pagination.Item>
      ) : ''}
    </Pagination>
    <Modal
      show={showAddConfig}
      onHide={handleCloseAddConfig}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? `Update User` : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>FirstName</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" value={values.firstname} onChange={(e) => setFirstName(e.target.value)} name='firstname' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" value={values.email} onChange={(e) => setEmail(e.target.value)} name='email' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>LastName</Form.Label>
          <Form.Control type="text"  className="form-control" placeholder="Enter first name" value={values.lastname} onChange={handleChange} name='lastname' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="text"
            placeholder="Enter Mobile"
            name="mobile"
            className="form-control"
            value={values.mobile}
            onChange={(e) => setMobile(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {isEdit ?
          <Button variant="dark" onClick={handleUpdate} type="submit">
            Update
          </Button> :
          <Button variant="dark" onClick={handleAddVariable} type="submit">
            Add
          </Button>

        }
        <Button variant="outline-danger" onClick={handleCloseAddConfig}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal
      show={showDelete}
      onHide={() => setShowDelete(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Variable "{values.firstname}"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you Sure you want to delete variable "{values.firstname}"
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDelete(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>Yes Delete</Button>
      </Modal.Footer>
    </Modal>

  </Protected>)
}

export default ListUser
