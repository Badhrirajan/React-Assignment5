import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import TextInput from './TextInput';

export default function Page() {
    const [users, setUsers] = useState([]);
    const [userList, setUserList] = useState({
        id: "",
        name: "",
        email: ""
    })
    const [mode, setMode] = useState("create")

    useEffect(() => {
        Axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
            if(response && response.status === 200){
                setUsers(response.data)
            }
        })
        .catch((err) => console.log('Error fetching data', err))
    },[]);

    function handleUser() {
        let usersCopy = [...users];
        usersCopy.push(userList);
        setUserList({});
        setUsers(usersCopy);
      }
    
      function handleUserInput(e) {
        let userCopy = {...userList};
        userCopy[e.target.id] = e.target.value;
        setUserList(userCopy);
    }

    function handleUserEdit(data = {}) {
        setMode("edit");
        setUserList(data);
      }

      function handleUpdateUser(e){
            if(mode === "edit") {
                let usersCopy = [...users]
                let matchedData = usersCopy.filter((d) => d.id !== userList.id)
                matchedData.push(userList);
                setUsers(matchedData)
                setUserList({})
                setMode('create')
            }
        }

    function handleDeleteUser(id = "") {
        let usersCopy = [...users]
        let matchedData = usersCopy.filter((d) => d.id !== id);
        setUsers(matchedData);
      }

  return (
    <div className='container'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-3'>
                    <TextInput
                    type="text"
                  placeholder="Enter Id Here"
                  id="id"
                  value={userList["id"]}
                  onChange={handleUserInput}
                  disabled = {mode === 'edit'}
                />
                    </div>
                    <div className='col-3'>
                    <TextInput
                    type="text"
                  placeholder="Enter Name Here"
                  id="name"
                  value={userList["name"]}
                  onChange={handleUserInput}
                />
                    </div>
                    <div className='col-3'>
                    <TextInput
                    type="email"
                  placeholder="Enter email Here"
                  id="email"
                  value={userList["email"]}
                  onChange={handleUserInput}
                />
                    </div>
                    <div className='col-3'>
                       <button className='btn btn-success' onClick={mode === "create" ? handleUser : handleUpdateUser}>
                        {mode === "create" ? "Add User" : "Edit User"}</button>
                    </div>
                </div>
                </div>    
            <table className="table table-dark table-hover table-bordered border-primary mt-3">
                <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    users?.map((d,i) => (
                    <tr key={`users-list-${i}`}>
                        <td>{d.id}</td>
                        <td>{d.name}</td>
                        <td>{d.email}</td>
                        <td><button className='btn btn-primary' onClick={() => handleUserEdit(d)}>Edit</button>
                        <button className='btn btn-danger mx-1' onClick={() => handleDeleteUser(d.id)}>Delete</button></td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
  )
}