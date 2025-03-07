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
            <h1 class="title is-3 has-text-centered">All Posts</h1>
            <div className="table-container">
            <table className="table">
            {allPosts.map((post) => {
               return <section key={post.id} class=" card m-3 p-3">
                    <Link to={`/posts/${post.id}`}><header>{post.title}</header></Link>
                    <div>Author: {post.first_name} {post.last_name}</div>
                    <div>Category: {post.category_label}</div>
                </section>
            })}
            </table>
            </div>
        </section>
    )
}

