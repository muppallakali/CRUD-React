import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { API_URL } from './api'

export default function UpdateUser() {
    let {id}=useParams()
    console.log("This is an id: ",id)
    let navigate=useNavigate()
    const [name,setName]=useState("")
    const [username,setUserName]=useState("")
    const [age,setAge]=useState(0)

    async function handleUpdate(e){
        e.preventDefault()
        let res=await fetch(`${API_URL}/update/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,username,age})
        })  
        if (!res.ok) {
            alert('Failed to Update data');
        }
        alert('Data updated successfully');
        navigate("/"); 
    }
    
    async function handleSubmit(e){       
        let res=await fetch(`${API_URL}/users/${id}`)  
        if (!res.ok) {
            alert('Failed to get data');
        }
        let data= await res.json()
        setName(data.name)
        setUserName(data.username)
        setAge(data.age)
        console.log(data)     
    }
    
    useEffect(()=>{
        handleSubmit()
    },[])


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white rounnded p-3">
            <form action="" onSubmit={(e)=>handleUpdate(e)}>
                <h2>Edit User</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} className='form-control' />
                </div>
                <div className="mb-2">
                    <label htmlFor="">User Name</label>
                    <input type="text" placeholder='User Name' value={username} onChange={(e)=>setUserName(e.target.value)} className='form-control' />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Agee</label>
                    <input type="number" placeholder='Password' value={age} onChange={(e)=>setAge(e.target.value)} className='form-control' />
                </div>
                <button type="submit" className='btn btn-success'>Update</button>
                <button  className='btn btn-success' onClick={e=>navigate("/")}>Cancel Update</button>
                
            </form>
        </div>
    </div>
  )
}
