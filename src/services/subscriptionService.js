export const subscribeToUser = async (submissionObject) => {
    const response = await fetch(`http://localhost:8088/subscriptions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    
    return response
}