import { useState, useEffect } from "react"
import { createNewPost } from "../../services/postService"
import { useNavigate } from "react-router-dom"

export const NewPost = ({ token }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [allCategories, setAllCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    useEffect(()=> {
        fetch("http://localhost:8088/categories")
            .then(response => response.json())
            .then(data => setAllCategories(data))
            .catch(error => console.error("Error with fetching tags", error))
    }, [])


    const navigate = useNavigate()
   
    const handleSavePost = (event) => {
        event.preventDefault()
        if (
            title &&
            content &&
            selectedCategory
        ) {
        const submissionObject = {
            user_id: token, //userid token?,
            category_id: selectedCategory,
            title: title,
            publication_date: new Date(),
            image_url: null,
            content: content,
            approved: true
        };
        // submit new post, createNewPost should return the new post's ID
        createNewPost(submissionObject).then((newPostId) => {navigate(`/posts/${newPostId}`)})

        } else {
            window.alert("Fill out all Fields")
        } 
    }

    
    return (
        <section>
            <h1 className="title is-3 has-text-centered">New Post</h1>
            <form className="field card m-4 p-4">
                <fieldset className="m-2">
                    <label className="label">Title: </label>
                    <input 
                        type="text"
                        placeholder="Enter title..."
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required />
                </fieldset>
                <fieldset className="m-2">
                    <label className="label">Image URL: </label>
                    <input 
                        type="text"
                        placeholder="Enter URL..."
                        name="imageURL"
                        disabled />
                </fieldset>
                <fieldset className="m-2">
                    <label className="label">Post: </label>
                    <textarea
                        type="text"
                        className="textarea"
                        placeholder="Enter post body..."
                        name="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        required />
                </fieldset>
                <fieldset className="m-2">
                    <label className="label">Category: </label>
                    <select
                        value={selectedCategory}
                        onChange={(event) => setSelectedCategory(event.target.value)}>
                            <option value="" >Select Category</option>
                            {allCategories.map(category => {
                                return (<option value={category.id} key={category.id} >{category.label}</option>)
                            })}
                    </select>
                </fieldset>
                <button type="submit" className="button is-success m-2" onClick={handleSavePost} >Submit Post</button>
            </form>
        </section>
    )
}