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
    return fetch(`http://localhost:8088/posts?_id=${id}`).then(res => res.json())
}

export const updateEditedPost = async (post) => {
    return await fetch(`http://localhost:8088/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}