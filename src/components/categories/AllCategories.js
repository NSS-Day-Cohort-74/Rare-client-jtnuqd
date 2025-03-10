import { useState, useEffect } from "react"
import { NewCategoryForm } from "./NewCategory"

export const AllCategories = () => {
    const [allCategories, setAllCategories] = useState([])
    const [error, setError] = useState(null)

    
    const setAndFetchCategories = () => {
        fetch("http://localhost:8088/categories")
            .then(response => response.json())
            .then(data => {setAllCategories(data)})
        // .catch(error => console.error("Error with fetching tags", error)) 
    }
    
    useEffect(()=> {
       setAndFetchCategories()
    }, [])

    return (
        <div className="columns">
        <section className="column card m-2">
            <h1 className="title is-3 has-text-centered">Categories</h1>
            {allCategories.map((category) => {
               return <section key={category.id} className="m-3 card p-2">
                    <header>Category: {category.label}</header>
                    <div className="buttons are-small">
                        <button className="button is-info m-1">Edit</button>
                        <button className="button is-danger m-1">Delete</button>
                    </div>
                </section>
            })}
        </section>
        <section className="column">
            <NewCategoryForm setAndFetchCategories={setAndFetchCategories} />
        </section>
        </div>
        )
    }