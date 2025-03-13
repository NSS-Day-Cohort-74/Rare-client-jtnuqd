import { useState, useEffect } from "react"
import { Link } from "react-router-dom"



export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [allTags, setAllTags] = useState([])
    const [selectedTag, setSelectedTag] = useState("")
    const [postTags, setAllPostTags] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [allTags, setAllTags] = useState([])
    const [selectedTag, setSelectedTag] = useState("")
    const [postTags, setAllPostTags] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=> {
        fetch("http://localhost:8088/posts")
            .then(response => response.json())
            .then(data => setAllPosts(data))
            .catch(error => console.error("Error with fetching posts", error))
    }, [])

    useEffect(()=> {
        fetch("http://localhost:8088/categories")
        .then(response => response.json())
        .then(data => setAllCategories(data))
        .catch(error => console.error("Error with fetching categories", error))
    }, [])

    useEffect(()=> {
        fetch("http://localhost:8088/tags")
        .then(response => response.json())
        .then(data => setAllTags(data))
        .catch(error => console.error("Error with fetching tags", error))
    }, [])
    
    useEffect(() => {
        fetch("http://localhost:8088/posttags")
        .then(response => response.json())
        .then(data => setAllPostTags(data))
        .catch(error => console.error("Error with fetching posttags", error))
    }, [])

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    const handleTagChange = (event) => {
        setSelectedTag(event.target.value)
    }

    const filteredPosts = allPosts.filter(post => {
        if (!postTags.length) return true;
        
        const categoryMatch = selectedCategory ? post.category_id === parseInt(selectedCategory) : true;
        const tagMatch = selectedTag ? postTags.some(pt => pt.post_id === post.id && pt.tag_id === parseInt(selectedTag)) : true;
        return categoryMatch && tagMatch
    })

    console.log("postTags", postTags)
    console.log("selectedTag", selectedTag)
    

    const searchedPosts = searchQuery ? filteredPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())) : filteredPosts
    console.log("postTags", postTags)
    console.log("selectedTag", selectedTag)
    
    return (
        <section>
            <h1 className="title is-3 has-text-centered">All Posts</h1>
            <div className="m-3 level-item">
                <label>Filter by Category: </label>
                <div className="m-3">
                    <select value={selectedCategory} onChange={handleCategoryChange} >
                        <option value="">All Categories</option>
                        {allCategories.map(category => (
                            <option key={category.id} value={category.id}>{category.label}</option>
                        ))}
                    </select>
                </div>
                <label>Search By Title: </label>
                <div className="m-3">
                        <input type="text" value={searchQuery} onChange={(event)=>{setSearchQuery(event.target.value)}} />
                </div>
            </div>
            <div className="m-3 level-item">
                <label>Filter by Tag: </label>
                <div className="m-3">
                    <select value={selectedTag} onChange={handleTagChange} >
                        <option value="">All Tag</option>
                        {allTags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid">
            <table className="cell is-hoverable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
            {searchedPosts.map((post) => {
               return <tr key={post.id} className="table is-bordered is-striped">
                    <td className=""><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                    <td className=""><Link to={`/users/${post.user_id}`}>{post.first_name} {post.last_name}</Link></td>
                    <td className="">{post.category_label}</td>
                </tr>
            })}
            </tbody>
            </table>
            </div>
        </section>
    )
}

