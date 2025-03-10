export const createNewPost = async (submissionObject) => {
    const response = await fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })

    const data = await response.json()

    return data
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`).then(res => res.json())
}

export const updateEditedPost = async (post, postId) => {
 await fetch(`http://localhost:8088/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
        
    })
}

export const deletePostByPostId = async (postId) => {
    return await fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}