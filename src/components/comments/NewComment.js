import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createNewComment } from "../../services/commentService"


export const NewComment = ({ token }) => {
    const [content, setContent] = useState("")

    const { postId } = useParams()

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        const newCommentObj = {
            post_id: postId,
            author_id: token,
            content: content
        }

        createNewComment(newCommentObj).then(() => {navigate(`/posts/${postId}/comments`)})
    }

    return (
        <section>
            <h2 className="title is-3 has-text-centered">New Comment</h2>
            <div className="m-6">
                <textarea
                    type="text"
                    className="textarea"
                    name="content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)} />
                <button disabled={!content.trim()} onClick={handleSubmit} className="button is-success m-5">Submit</button>
            </div>
        </section>
    )
}