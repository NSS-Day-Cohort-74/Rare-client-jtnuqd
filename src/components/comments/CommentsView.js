import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CommentsView = () => {
    const [allPostComments, setAllPostComments] = useState([])

    const { postId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/comments/${postId}`)
        .then(response => response.json())
        .then(data => setAllPostComments(data))
        .catch(error => console.error("Error with fetching comments", error))
    }, [postId])

    return (
        <section>
            <h1 className="title is-3 has-text-centered">Comments</h1>
            {allPostComments.map(comment => {
                return (
                    <section key={comment.id}>
                        <div className="card m-5 p-3">
                        <div>"{comment.content}"</div>
                        <div>by: {comment.first_name} {comment.last_name}</div>
                        </div>
                    </section>
                )
            })}
        </section>
    )
}