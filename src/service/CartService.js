import axios from "../axios";

class CartService{
    fetchCarts = async () => {
        const promise = new Promise((resolve, reject) => {
          axios
            .get("carts")
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

export default new CartService();