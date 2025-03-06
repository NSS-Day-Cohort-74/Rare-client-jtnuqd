export const createNewCategory = async (submissionObject) => {
    await fetch("http://localhost:8088/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
}