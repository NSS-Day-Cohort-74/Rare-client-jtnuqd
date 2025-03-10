import { useState, useEffect } from "react"
import { NewTagForm } from "./NewTag"

export const AllTags = () => {
    const [allTags, setAllTags] = useState([])
    const [error, setError] = useState(null)

    const setAndFetchTags = () => {
        fetch("http://localhost:8088/tags")
            .then(response => response.json())
            .then(data => {setAllTags(data)})
        // .catch(error => console.error("Error with fetching tags", error)) 
    }
    
    useEffect(()=> {
       setAndFetchTags()
    }, [])


    return (
        <div className="columns">
        <section className="column card m-2">
            <h1 className="title is-3 has-text-centered">Tags</h1>
            {allTags.map((tag) => {
               return <section key={tag.id} className="m-3 card p-2">
                    <header>Tag: {tag.label}</header>
                    <div className="buttons are-small"> 
                        <button className="button is-info m-1">Edit</button>
                        <button className="button is-danger m-1">Delete</button>
                    </div>
                </section>
            })}
        </section>
        <section className="column">
            <NewTagForm  setAndFetchTags={setAndFetchTags}/>
        </section>
        </div>
    )
}