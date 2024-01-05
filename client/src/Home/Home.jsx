import { useState, useEffect } from 'react'
import API from '../API.js'


export default function Home(){

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

    return(
        <div>
            <h1>Welcome to Angela's Positivity Log!</h1>
            {body != null && body.map( (entry) => {
                return(
                    <div style={{ border:"solid"}}>
                        <h3>{entry.date}</h3>
                        {entry.items.map( (item) => {
                            return(
                                <p>- {item}</p>
                            )
                        })}
                        
                    </div>
                )
            })}
        </div>
    )
}