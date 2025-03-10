import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { deletePostByPostId } from "../../services/postService"

export const MyPosts = ({token}) => {
    const [allUserPosts, setAllUserPosts] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(()=> {
        fetchAndSetMyPosts()
    }, [token])

    const fetchAndSetMyPosts = () => {
        fetch(`http://localhost:8088/myposts/${token}`)
        .then(response => response.json())
        .then(data => setAllUserPosts(data))
        .catch(error => console.error("Error with fetching posts", error))
    }

    const navigate = useNavigate()


    const handleDelete = (postId) => {
        deletePostByPostId(postId).then(()=>{fetchAndSetMyPosts()})
    }

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
                                <button className="button is-success m-3" onClick={() => setShowModal(!showModal)} >Delete</button>
                            </div>
                            {showModal ? <><div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Delete Confirmation</p>
                <button className="delete" aria-label="close" onClick={() => setShowModal(!showModal)}></button>
            </header>
        <section className="modal-card-body">
            <p>Are you sure you would like to delete this post?</p>
    </section>
    <footer className="modal-card-foot">
      <div className="buttons">
        <button className="button is-danger" onClick={() => {
            setShowModal(!showModal)
            handleDelete(post.id)
        }}>Delete Post</button>
        <button className="button" onClick={() => setShowModal(!showModal)}>Cancel</button>
      </div>
    </footer>
  </div>
</div></> : ""}
                        </section>
                    )
                })}
            </div>
        </section>
    )
}