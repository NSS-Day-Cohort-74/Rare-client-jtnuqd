import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const MyPosts = ({token}) => {
    const [allUserPosts, setAllUserPosts] = useState([])

    useEffect(()=> {
        fetch(`http://localhost:8088/myposts/${token}`)
        .then(response => response.json())
        .then(data => setAllUserPosts(data))
        .catch(error => console.error("Error with fetching posts", error))
    }, [token])

    const navigate = useNavigate()

    return (
        <section className="m-3">
            <h1 className="title is-3 has-text-centered">My Posts</h1>
            <div className="m-3">
                {allUserPosts.map(post => {
                    return (
                        <section key={post.id} className="card p-4">
                            <div>{post.title}</div>
                            <div>Author: {post.author}</div>
                            <div>Date: {post.publication_date}</div>
                            <div>{post.image_url}</div>
                            <div>
                                {/* Check to see if post's user_id is the current user's token, 
                                if so, display the edit button, if not, do not show it */}
                                {/* {post.user_id === token ? <button className="button is-success m-3" onClick={() => navigate(`/edit/post/${post.id}`)} >Edit</button> : ""} */}
                                <button className="button is-success m-3" onClick={() => navigate(`/edit/post/${post.id}`)} >Edit</button> 
                                <button className="button is-success m-3" >Delete</button>
                            </div>
                        </section>
                    )
                })}
            </div>
        </section>
    )
}