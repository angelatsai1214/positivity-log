import { useState } from "react"
import "./Create.css"
import axios from 'axios'

export default function Create() {

    const [item, setItem] = useState([])
    let items = []

    const handleSubmit = async() => {
        
        items = item.split("\n")
        console.log(items)
        try{
            const res = await axios.post("http://localhost:5005/entries/create", {items})
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="create-container">
            <h1>Enter your entries for the day separated by newline:</h1>
            <form onSubmit={handleSubmit}>
                {/* <input type="text" onChange={e=>setItem(e.target.value)} /> */}
                <textarea onChange={e=>setItem(e.target.value)} className="textarea"/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}