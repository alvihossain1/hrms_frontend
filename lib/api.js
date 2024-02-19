import axios from "axios"
let SERVER_URL = process.env.SERVER_URL 

export async function getPosts() {
  return await axios.get(`${SERVER_URL}/products`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return { status: 400, data: error.message };
    });
}
