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
        <>
        <section>
            <h1>All Tags</h1>
            {allTags.map((tag) => {
               return <section key={tag.id}>
                    <header>Tag: {tag.label}</header>
                    <div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </section>
            })}
        </section>
        <section>
            <NewTagForm  setAndFetchTags={setAndFetchTags}/>
        </section>
        </>
    )
}