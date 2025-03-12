import { useState, useEffect } from "react"
import { Link } from "react-router-dom"



export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
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


    const searchedPosts = searchQuery ? filteredPosts.filter(post => post.title.includes(searchQuery)) : filteredPosts

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
                <label>Search By Title: </label>
                <div className="m-3">
                        <input type="text" value={searchQuery} onChange={(event)=>{setSearchQuery(event.target.value)}} />
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
            {searchedPosts.map((post) => {
               return <tr key={post.id} className="table is-bordered is-striped">
                    <td className=""><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                    <td className=""><Link to={`/users/${post.user_id}`}>{post.first_name} {post.last_name}</Link></td>
                    <td className="">{post.category_label}</td>
                </tr>
            })}
            </tbody>
            </table>
            </div>
        </section>
    )
}

