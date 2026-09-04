
// TODO: Mover para .env
const API_URL = 'http://localhost:3000'

export const sendFile = (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
    }).then(response => response.json())
}
