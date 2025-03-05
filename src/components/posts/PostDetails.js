import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const PostDetails = () => {
    const [post, setPost] = useState(null)
    const { postId } = useParams()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

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
        <section>
            <h1>{post?.title}</h1>
            <div>Author: {post?.first_name} {post?.last_name}</div>
            <div>Category: {post?.category_label}</div>
            <div>Publication Date: {post?.publication_date}</div>
            <div>{post?.content}</div>
        </section>
    )
}