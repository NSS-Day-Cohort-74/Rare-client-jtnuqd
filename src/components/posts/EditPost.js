import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPostById, updateEditedPost } from "../../services/postService"

export const EditPost = () => {
    const [post, setPost] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [allTags, setAllTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
  

    const { postId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getPostById(postId).then(data => {
            setPost(data)
            setSelectedTags(data.tags ? data.tags.map(tag => tag.id) : []) // Store existing tags
        });

        fetch("http://localhost:8088/tags")
        .then(response => response.json())
        .then(data => setAllTags(data))
        .catch(error => console.error("Error fetching tags", error))
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
    };

    const handleTagChange = (event) => {
        const tagId = parseInt(event.target.value)
        if(event.target.checked) {
            setSelectedTags([...selectedTags, tagId])
        } else {
            setSelectedTags(selectedTags.filter(id => id !== tagId))
        }
    };
    
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
            approved: post.approved,
            tag_ids: selectedTags //include updated tags
        }

        updateEditedPost(editedPost, postId).then(() => {
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
                        value={post?.title ? post.title : ''}
                        onChange={handleInputChange}
                        required />
                </fieldset>
                <fieldset className="m-2">
                    <label className="label">Image URL: </label>
                    <input 
                        type="text"
                        value={post?.image_url ? post.image_url : ''}
                        onChange={handleInputChange}
                        name="image_url"
                        required />
                </fieldset>
                <fieldset className="m-2">
                    <label className="label">Post: </label>
                    <textarea
                        type="text"
                        className="textarea"
                        name="content"
                        value={post?.content ? post.content : ''}
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
                <fieldset className="m-2">
                    <label className="label">Tags:</label>
                    <div className="check-box-group">
                        {allTags.map(tag => (
                            <label key={tag.id} className="checkbox m-2">
                                <input 
                                type="checkbox"
                                value={tag.id}
                                checked={selectedTags.includes(tag.id)}
                                onChange={handleTagChange}
                                />
                                {tag.label}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <button type="submit" className="button is-success m-2" onClick={handleSaveEdit} >Save Post</button>
            </form>
        </section>
    )
}