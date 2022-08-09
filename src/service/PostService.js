import axios from "../axios";

class PostService {

    deleteUser = async (userId) => {
         const promise=new Promise((resolve, reject)=>{
            axios.delete("users/"+userId)
            .then((res)=>{
                return resolve(res);
            })
            .catch((err)=>{
                return resolve(err);
            })
         })
         return await promise;
    };

  putUser = async (data, userId) => {
    //console.log(data);
    //console.log(userId);
    const promise = new Promise((resolve, reject) => {
      axios
        .put("users/" + userId, data)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return resolve(err);
        });
    });
    return await promise;
  };

  postUser = async (data) => {
    //console.log(data)
    const promise = new Promise((resolve, reject) => {
      axios
        .post("users", data)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return resolve(err);
        });
    });
    return await promise;
  };

  fetchPost = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("users")
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          resolve(er);
        });
    });
    return await promise;
  };
}

export default new PostService();
