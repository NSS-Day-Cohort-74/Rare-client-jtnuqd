export const createNewComment = async (newCommentObj) => {
    await fetch("http://localhost:8088/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCommentObj)
    })
}