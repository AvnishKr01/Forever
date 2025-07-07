import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const currency = '$';
    const delivery_fee = 10;
    const BackendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [addCart, setAddCart] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [token, setToken] = useState('');


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        const cartData = structuredClone(addCart);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setAddCart(cartData);

        if (token) {
            try {
                const response = await axios.post(`${BackendUrl}/api/cart/addcart`, { itemId, size }, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message)

            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in addCart) {
            for (const item in addCart[items]) {
                try {
                    if (addCart[items][item] > 0) {
                        totalCount += addCart[items][item]
                    }
                } catch (error) {
                    console.log(error);

                }

            }
        }
        return totalCount;
    }

    const updateQuantityData = async (itemId, size, quantity) => {
        let cartData = structuredClone(addCart);
        cartData[itemId][size] = quantity;

        setAddCart(cartData);

        if (token) {
            try {
                const response = await axios.post(`${BackendUrl}/api/cart/updatecart`, { itemId, size, quantity }, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const totalCartAmount = () => {
        let totalAmount = 0;
        for (const items in addCart) {
            let iteminfo = products.find((product) => product._id === items)
            for (const item in addCart[items]) {
                try {
                    if (addCart[items][item] > 0) {
                        totalAmount += iteminfo.price * addCart[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductData = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/api/product/list`);
            if (response.data.success) {
                // console.log(response.data);
                setProducts(response.data.product);
            }
            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getCartData = async (token) => {
        try {
            const response = await axios.post(`${BackendUrl}/api/cart/getcart`, {}, { headers: { token } });
            if (response.data.success) {
                setAddCart(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);

        }
    }

    // Load token from localStorage once on mount
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
            getCartData(token)
        }
        getProductData();
    }, [])

    // Save token to localstorage to whenever is change
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        }
    }, [token])

    const value = {
        products,
        BackendUrl,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        addCart,
        setAddCart,
        getCartCount,
        updateQuantityData,
        totalCartAmount,
        navigate,
        token,
        setToken
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;