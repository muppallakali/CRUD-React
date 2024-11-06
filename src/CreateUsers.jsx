import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { API_URL } from './api'

export default function CreateUser() {
    const [name,setName]=useState("")
    const [username,setUserName]=useState("")
    const [age,setAge]=useState(0)
    const navigate=useNavigate()
async function handleSubmit(e){
    e.preventDefault()
    let res=await fetch(`${API_URL}/data`,{        
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,username,age})
    })  
    if (!res.ok) {
        alert('Failed to submit data');
    }
    let data= await res.json()
    console.log(data.user)
    alert("Data saved successfully")
    setAge(0)
    setName("")
    setUserName("")
    navigate("/")
    
}

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white rounnded p-3">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h2>Add user</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control' value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">User Name</label>
                    <input type="text" placeholder='User Name' className='form-control' value={username} onChange={(e)=>setUserName(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Age</label>
                    <input type="number" placeholder='Age' className='form-control' value={age} onChange={(e)=>setAge(e.target.value)} />
                </div>
                <button className='btn btn-success' type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}
