export const createNewTag = async (submissionObject) => {
    await fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
}