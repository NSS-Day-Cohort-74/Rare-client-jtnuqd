import { useState, useEffect } from "react"
import { Link } from "react-router-dom"



export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [error, setError] = useState(null)

    useEffect(()=> {
        fetch("http://localhost:8088/posts")
            .then(response => response.json())
            .then(data => setAllPosts(data))
            .catch(error => console.error("Error with fetching posts", error))
    }, [])

    useEffect(()=> {
        fetch("http://localhost:8088/categories")
        .then(response => response.json())
        .then(data => setAllCategories(data))
        .catch(error => console.error("Error with fetching tags", error))
    }, [])

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    const filteredPosts = selectedCategory ? allPosts.filter(post => 
        post.category_id === parseInt(selectedCategory)) : allPosts

    return (
        <section>
            <h1 className="title is-3 has-text-centered">All Posts</h1>
            <div className="m-3 level-item">
                <label>Filter by Category: </label>
                <div className="m-3">
                    <select value={selectedCategory} onChange={handleCategoryChange} >
                        <option value="">All Categories</option>
                        {allCategories.map(category => (
                            <option key={category.id} value={category.id}>{category.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid">
            <table className="cell is-hoverable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
            {filteredPosts.map((post) => {
               return <tr key={post.id} className="table is-bordered is-striped">
                    <td className=""><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                    <td className="">{post.first_name} {post.last_name}</td>
                    <td className="">{post.category_label}</td>
                </tr>
            })}
            </tbody>
            </table>
            </div>
        </section>
    )
}

