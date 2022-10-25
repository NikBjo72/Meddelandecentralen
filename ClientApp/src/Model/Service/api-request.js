import axios from 'axios';

// Gets all rooms
export const GetRooms = async () => {
  try {
    const response = await axios.get(
      '/api/rooms',
    );
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

// Get room by Id
export const GetRoomsById = async (id) => {
  try {
    const response = await axios.get(
      `/api/rooms/${id}`,
    );
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

// Change room status
export const EditRoom = async (id, model) => {
  try {
    const response = await axios.patch(
      `/api/rooms/${id}`,
      model
    );
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

// Gets all messages
export const GetMessages = async () => {
  try {
    const response = await axios.get(
      '/api/messages',
    );
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};
