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
        <div class="columns">
        <section class="column card m-2">
            <h1 class="title is-3 has-text-centered">Categories</h1>
            {allCategories.map((category) => {
               return <section key={category.id} class="m-3 card p-2">
                    <header>Category: {category.label}</header>
                    <div class="buttons are-small">
                        <button class="button is-info m-1">Edit</button>
                        <button class="button is-danger m-1">Delete</button>
                    </div>
                </section>
            })}
        </section>
        <section class="column">
            <NewCategoryForm setAndFetchCategories={setAndFetchCategories} />
        </section>
        </div>
        )
    }