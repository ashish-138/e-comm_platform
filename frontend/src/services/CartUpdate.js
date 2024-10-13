import axios from "axios";
import { setHeader } from "./Header";
import { Getauth } from "./Auth";


export const CartUpdate = async () => {
    const apiUrl = process.env.REACT_APP_BASE_URL

    const checkAuth = () => {
        const auth = Getauth();
        if (auth) {
            checkPreLogin();
        }
    };

    const checkPreLogin = async () => {
        try {
            const user = await axios.get(`${apiUrl}/api/v1/user/checkauth`, setHeader());
            if (user.data) {
                const data = localStorage.getItem("cart");
                if (data) {
                    const newData = JSON.parse(data);
                    const cartItems = newData.map(e => ({
                        productId: e._id,
                        qty: e.qty
                    }));

                    try {
                        await axios.put(`${apiUrl}/api/v1/cart`, { cartItems }, setHeader());
                    } catch (error) {
                        console.error('Error updating cart:', error);
                    }
                } else {
                    await axios.put(`${apiUrl}/api/v1/cart`, [], setHeader());
                    console.warn('No cart data found in localStorage.');
                }
            }
        } catch (error) {
            console.error('Error checking user authentication:', error);
        }
    };

    checkAuth();
};
