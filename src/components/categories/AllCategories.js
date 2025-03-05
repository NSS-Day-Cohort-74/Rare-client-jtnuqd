import { useState, useEffect } from "react"

export const AllCategories = () => {
    const [allCategories, setAllCategories] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=> {
        fetch("http://localhost:8088/categories")
            .then(response => response.json())
            .then(data => setAllCategories(data))
            .catch(error => console.error("Error with fetching tags", error))
    }, [])

    return (
        <section>
            <h1>All Categories</h1>
            {allCategories.map((category) => {
               return <section key={category.id}>
                    <header>Tag: {category.label}</header>
                    <div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </section>
            })}
        </section>
        )
    }