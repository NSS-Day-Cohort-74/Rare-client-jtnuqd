import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { HumanDate } from "../utils/HumanDate"


export const PostDetails = () => {
    const [post, setPost] = useState(null)
    const { postId } = useParams()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8088/posts/${postId}`)
                if (!response.ok) {
                    throw new Error(`http error, Status: ${response.status}`)
                }
                const data = await response.json()
                setPost(data)
            } catch (error) {
                console.error("Error fetching post details:", error)
                setError("Failed to load post details. Please try again.")
            } finally {
                setLoading(false)
            }
        }
        fetchPostDetails()
    }, [postId])

    return (
        <section className="card m-2 p-2 columns">
            <div className="column">
                <h1 className="title is-4">{post?.title}</h1>
            <div className="card-image">
                <figure className="image-is4by3">
                   <img
                   src="https://bulma.io/assets/images/placeholders/1280x960.png"
                   alt="Placeholder img"
                   /> 
                </figure>
            </div>
                <div className="m-2 columns">
                    <div className="column">By: <Link to={`/users/${post?.user_id}`}>{post?.first_name} {post?.last_name}</Link></div>
                    <div className="column">Date: {<HumanDate date={post?.publication_date} />}</div>
                    <button className="button is-success" onClick={() => navigate(`/posts/${postId}/comments`)} >View Comments</button>
                </div>
                <div className="m-4">{post?.content}</div>
            </div>
                <div className="">Category: {post?.category_label}</div>    
        </section>
    )
}