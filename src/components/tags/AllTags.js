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
        <div class="columns">
        <section class="column card m-2">
            <h1 class="title is-3 has-text-centered">Tags</h1>
            {allTags.map((tag) => {
               return <section key={tag.id} class="m-3 card p-2">
                    <header>Tag: {tag.label}</header>
                    <div class="buttons are-small"> 
                        <button class="button is-info m-1">Edit</button>
                        <button class="button is-danger m-1">Delete</button>
                    </div>
                </section>
            })}
        </section>
        <section class="column">
            <NewTagForm  setAndFetchTags={setAndFetchTags}/>
        </section>
        </div>
    )
}