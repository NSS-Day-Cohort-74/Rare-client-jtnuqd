import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPostById, updateEditedPost } from "../../services/postService"

export const EditPost = () => {
    const [post, setPost] = useState([])
    const [allCategories, setAllCategories] = useState([])

    const { postId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getPostById(postId).then(data => {
            const postObj = data
            setPost(postObj)
        })
    }, [postId])
    
    useEffect(()=> {
        fetch("http://localhost:8088/categories")
        .then(response => response.json())
        .then(data => setAllCategories(data))
        .catch(error => console.error("Error with fetching tags", error))
    }, [])
    
    const handleInputChange = (event) => {
        const postCopy = {...post}
        postCopy[event.target.name] = event.target.value
        setPost(postCopy)
    }
    
    // when PUTting post Data, use the /posts/#pk endpoint
    const handleSaveEdit = (event) => {
        event.preventDefault()
        const editedPost = {
            title: post.title,
            content: post.content,
            category_id: parseInt(post.category_id),
            image_url: post.image_url,
            user_id: post.user_id,
            publication_date: post.publication_date,
            approved: post.approved
        }

        updateEditedPost(postId, editedPost).then(() => {
            navigate(`/posts/${postId}`)
        })
    }
    
    return (
        <section>
            <h1 className="title is-3 has-text-centered">Edit Post</h1>
            <form className="field card m-4 p-4">
                <fieldset className="m-2">
                    <label className="label">Title: </label>
                    <input 
                        type="text"
                        name="title"
                        value={post.title ? post.title : ''}
                        onChange={handleInputChange}
                        required />
                </fieldset>
                <fieldset className="m-2">
                    <label className="label">Image URL: </label>
                    <input 
                        type="text"
                        name="image_url"
                        value={post.image_url ? post.image_url : ''}
                         />
                </fieldset>
                <fieldset className="m-2">
                    <label className="label">Post: </label>
                    <textarea
                        type="text"
                        className="textarea"
                        name="content"
                        value={post.content ? post.content : ''}
                        onChange={handleInputChange}
                        required />
                </fieldset>
                <fieldset className="m-2">
                    <label className="label">Category: </label>
                    <select
                        name="category_id"
                        value={post.category_id}
                        onChange={handleInputChange}>
                            {allCategories.map(category => {
                                return (<option value={category.id} key={category.id} >{category.label}</option>)
                            })}
                    </select>
                </fieldset>
                <button type="submit" className="button is-success m-2" onClick={handleSaveEdit} >Save Post</button>
            </form>
        </section>
    )
}