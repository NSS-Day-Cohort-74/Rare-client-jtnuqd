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
