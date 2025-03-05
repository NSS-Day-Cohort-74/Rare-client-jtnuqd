import { useState, useEffect } from "react"

export const AllTags = () => {
    const [allTags, setAllTags] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=> {
        fetch("http://localhost:8088/tags")
            .then(response => response.json())
            .then(data => setAllTags(data))
            .catch(error => console.error("Error with fetching tags", error))
    }, [])

    return (
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
    )
}