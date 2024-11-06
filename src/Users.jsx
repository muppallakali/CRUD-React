import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import { API_URL } from './api'

export default function Users() {
    let [user,setuser]=useState([])
    async function fetchData(){
        let res=await fetch(`${API_URL}/users`)
        
        let data=await res.json()
        setuser(data)
        console.log(user)
    }
    async function deleteuser(id){
        const confirmed = window.confirm("Are you sure you want to delete User?");
       if(confirmed){
            try{
                let res=await fetch(`${API_URL}/delete/${id}`,{method:"DELETE"})
                if(!res.ok){
                    alert('Failed to delete user');
                }
                alert('User Deleted successfully');
                window.location.reload();

            }
            catch(error){
                alert("error in fetching data to delete")
                console.log("error in fetching data to delete",error)
            }            
        }

    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white rounnded p-3">
            <Link to="/create" className="btn btn-success">Add+</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((x)=>{
                        console.log(user)
                        return(<tr>
                            <td>{x.name}</td>
                            <td>{x.username}</td>
                            <td>{x.age}</td>
                            <td>
                            <Link to={`/updateUser/${x._id}`} className="btn btn-success">Update</Link>
                            <button onClick={()=>deleteuser(x._id)}>Delete</button></td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
