import { useState, useEffect } from 'react'
import API from '../API.js'
import "./Home.css"

export default function Home(){


    const [submitType, setSubmitType] = useState("Submit Entry")

    // Get
    const [body, setBody] = useState([])

    useEffect( () => {
        API.getEntries()
        .then( (res) => {
            setBody(res.data.payload)
        }
        )
        .catch( (err) =>{
            console.log(err)
        }
        )
        
    }
    ,[])


    // Create
    const [item, setItem] = useState([])
    const [itemIdToEdit, setTemp] = useState("")
    const [err, setErr] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        let items = item.length !== 0 ? item.split("\n") : []
        items = items.filter(item=>item.length!==0)
        console.log(items)

        if(submitType === "Edit Entry"){
            console.log(itemIdToEdit, items)
            API.editEntry( itemIdToEdit, items).then((res)=>console.log(res)).catch((err)=>console.log(err))
            setSubmitType("Submit Entry")
            window.location.reload();
        }else{
            API.postEntries(items).then((res)=>{
                console.log(!res.data.success)
                if(!res.data.success ){
                    setErr(res.data.message)
                }else{
                    window.location.reload();
                }  
            }).catch((err)=>console.log(err))
        }
    }

    // Update
    const handleEdit = async(id) => {
        setTemp(id)
        await API.getOneEntries(id)
        .then( (res) =>{
            let entryText = res.data.payload[0].items;
            entryText = entryText.join("\n");
            console.log(entryText)
            setItem(entryText)
            setSubmitType("Edit Entry")
        }).catch( (err) => console.log(err))
        
    }

    // Delete
    const handleDelete = (id) =>{
        API.deleteEntry(id).then((res)=>console.log(res)).catch((err)=>console.log(err))
        window.location.reload();
    }

    return(
        <div className="big-container">
        <div className="title">
            <h1>Welcome to Angela's Positivity Log!</h1>
        </div>
        <div className="create-container">
            <form onSubmit={handleSubmit}>
                {/* <input type="text" onChange={e=>setItem(e.target.value)} /> */}
                <textarea onChange={e=>setItem(e.target.value)} placeholder="Enter your entry for the day separated by newline" value={item} className="textarea"/>
                <br/>
                <p>{err}</p>
                <br />
                <button type="submit">{submitType}</button>
            </form>
        </div>
        <div className="view-container">
            {body != null && body.map( (entry) => {
                return(
                    <div className="view-item" key={entry._id}>
                        <div className='item-row'>
                        <h3>{entry.date}</h3>
                        </div>
                        {entry.items.map( (item) => {
                            return(
                                
                                <div className='item-row' key={item._id}>
                                <p>- {item}</p>
                                </div>
                                
                            )
                        })}
                        <div>
                            <button onClick={ () => handleEdit(entry._id)}>Edit</button>
                            <button onClick={ () => handleDelete(entry._id)} style={{marginLeft: "10px"}}>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
    )
}