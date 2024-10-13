import axios from "axios";
import { setHeader } from "./Header";
import { Getauth } from "./Auth";

export const CartUpdate = async () => {
    const checkAuth = () => {
        const auth = Getauth();
        if (auth) {
            checkPreLogin();
        }
    };

    const checkPreLogin = async () => {
        try {
            const user = await axios.get("http://127.0.0.1:8000/api/v1/user/checkauth", setHeader());
            if (user.data) {
                const data = localStorage.getItem("cart");
                if (data) {
                    const newData = JSON.parse(data);
                    const cartItems = newData.map(e => ({
                        productId: e._id,
                        qty: e.qty
                    }));

                    try {
                        await axios.put("http://127.0.0.1:8000/api/v1/cart", { cartItems }, setHeader());
                    } catch (error) {
                        console.error('Error updating cart:', error);
                    }
                } else {
                    await axios.put("http://127.0.0.1:8000/api/v1/cart", [], setHeader());
                    console.warn('No cart data found in localStorage.');
                }
            }
        } catch (error) {
            console.error('Error checking user authentication:', error);
        }
    };

    checkAuth();
};
