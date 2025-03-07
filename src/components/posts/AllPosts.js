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
            <h1 className="title is-3 has-text-centered">All Posts</h1>
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
            {allPosts.map((post) => {
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

