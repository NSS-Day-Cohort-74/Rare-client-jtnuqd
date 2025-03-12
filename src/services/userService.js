export const getUserDataByUserId = async (userId) => {
    const response = await fetch(`http://localhost:8088/users/${userId}`)
    const data = await response.json()
    return data
} 