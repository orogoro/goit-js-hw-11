import axios from 'axios';
import { API_HOST } from '../config';

export default async function getPicture(query) {
  const response = await axios.get(
    `${API_HOST}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`,
  );
  return response;
}
