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
            <h1>New Post</h1>
            <form>
                <fieldset>
                    <label>Title: </label>
                    <input 
                        type="text"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required />
                </fieldset>
                <fieldset>
                    <label>Post: </label>
                    <input
                        type="text"
                        name="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        required />
                </fieldset>
                <fieldset>
                    <label>Category: </label>
                    <select
                        value={selectedCategory}
                        onChange={(event) => setSelectedCategory(event.target.value)}>
                            <option value="" >Select Category</option>
                            {allCategories.map(category => {
                                return (<option value={category.id} key={category.id} >{category.label}</option>)
                            })}
                    </select>
                </fieldset>
                <button type="submit" onClick={handleSavePost} >Submit Post</button>
            </form>
        </section>
    )
}