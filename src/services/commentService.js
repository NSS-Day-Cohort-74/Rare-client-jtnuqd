export const createNewComment = async (newCommentObj) => {
    await fetch("http://localhost:8088/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCommentObj)
    })
}

export const deleteUserCommentById = async (commentId) => {
    const response = await fetch(`http://localhost:8088/comments/${commentId}`, {
         method: "DELETE",
         headers: {
             "Content-Type": "application/json"
         }
     })
 
     return response.ok
     
 }