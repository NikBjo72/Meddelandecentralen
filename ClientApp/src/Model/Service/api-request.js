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
