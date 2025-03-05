import { useState, useEffect } from "react"
import { Link } from "react-router-dom"



export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=> {
        fetch("http://localhost:8088/posts")
            .then(response => response.json())
            .then(data => setAllPosts(data))
            .catch(error => console.error("Error with fetching posts", error))
    }, [])

    return (
        <section>
            <h1>All Posts</h1>
            {allPosts.map((post) => {
               return <section key={post.id}>
                    <Link to={`/posts/${post.id}`}><header>{post.title}</header></Link>
                    <div>Author: {post.first_name} {post.last_name}</div>
                    <div>Category: {post.category_label}</div>
                </section>
            })}
        </section>
    )
}

