import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { deleteUserCommentById } from "../../services/commentService"

export const CommentsView = ({ token }) => {
    const [allPostComments, setAllPostComments] = useState([])

    const { postId } = useParams()

    const getAllPostComments = () => {
        fetch(`http://localhost:8088/comments/${postId}`)
        .then(response => response.json())
        .then(data => setAllPostComments(data))
        .catch(error => console.error("Error with fetching comments", error))
    }

    useEffect(() => {
        getAllPostComments()
    }, [postId])

    const deleteComment = (commentId) => {
        deleteUserCommentById(commentId).then(() => {
            getAllPostComments(postId)
        })
    }

    return (
        <section>
            <h1 className="title is-3 has-text-centered">Comments</h1>
            {allPostComments.map(comment => {
                return (
                    <section key={comment.id}>
                        <div className="card m-5 p-3">
                        <div>"{comment.content}"</div>
                        <div>by: {comment.first_name} {comment.last_name}</div>
                        {parseInt(token) === comment.author_id && (
                            <button onClick={() => deleteComment(comment.id)} className="button is-danger m-2">🗑️</button>
                        )}
                        </div>
                    </section>
                )
            })}
        </section>
    )
}