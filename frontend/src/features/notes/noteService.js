import axios from 'axios'

// Get ticket notes
const getAllNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`/tickets/${ticketId}/notes`, config)

  return response.data
}

// Create ticket note
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    `/tickets/${ticketId}/notes`,
    { text: noteText },
    config
  )

  return response.data
}

const noteService = {
  getAllNotes,
  createNote,
}

export default noteService
