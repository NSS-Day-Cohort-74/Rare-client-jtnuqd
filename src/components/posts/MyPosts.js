import { useState, useEffect } from "react"

export const MyPosts = ({token}) => {
    const [allUserPosts, setAllUserPosts] = useState([])

    useEffect(()=> {
        fetch(`http://localhost:8088/myposts/${token}`)
        .then(response => response.json())
        .then(data => setAllUserPosts(data))
        .catch(error => console.error("Error with fetching posts", error))
    }, [token])

    return (
        <section className="m-3">
            <h1>My Posts</h1>
            <div>
                {allUserPosts.map(post => {
                    return (
                        <section key={post.id} className="card">
                            <div>{post.title}</div>
                            <div>Author: {post.author}</div>
                            <div>Date: {post.publication_date}</div>
                            <div>{post.image_url}</div>
                            <div>
                                <button className="button is-success m-3" >Edit</button>
                                <button className="button is-success m-3" >Delete</button>
                            </div>
                        </section>
                    )
                })}
            </div>
        </section>
    )
}