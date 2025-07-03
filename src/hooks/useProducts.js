
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    setProducts,
    setLoading,
    setFilteredProducts,
} from "../redux/slices/productsRedux";
import {
    selectProducts,
    selectFilteredProducts,
    selectLoading,
} from "../redux/selectors/productsSelectors";

export const useProducts = (queryParams) => {
    const [loadingMore, setLoadingMore] = useState(false);
    const dispatch = useDispatch();

    const products = useSelector(selectProducts);
    const filteredProducts = useSelector(selectFilteredProducts);
    const loading = useSelector(selectLoading);
    console.log(filteredProducts);

    const buildUrl = (params) => {
        const url = new URL("https://clothes-app-api.onrender.com/api/products");
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                url.searchParams.append(key, value);
            }
        });
        return url.toString();
    };

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(setLoading(true));
            try {
                const paramsWithLimit = {
                    ...queryParams,
                    categories: queryParams.category || queryParams.categories,
                    limit: queryParams.limit || 8,
                };

                if (paramsWithLimit.categories && paramsWithLimit.category) {
                    delete paramsWithLimit.category;
                }

                const url = buildUrl(paramsWithLimit);
                const response = await axios.get(url);

                dispatch(setFilteredProducts(response.data));
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchProducts();
    }, [JSON.stringify(queryParams), dispatch]);


    const loadMoreProducts = async () => {
        setLoadingMore(true);
        try {
            const currentLimit = Number(queryParams.limit || 8);
            const newLimit = currentLimit + 8;

            const paramsWithNewLimit = { ...queryParams, limit: newLimit };
            const url = buildUrl(paramsWithNewLimit);
            const response = await axios.get(url);

            const newProducts = response.data;
            const mergedProducts = [...filteredProducts];

            newProducts.forEach((prod) => {
                if (!mergedProducts.find((p) => p._id === prod._id)) {
                    mergedProducts.push(prod);
                }
            });

            dispatch(setFilteredProducts(mergedProducts));
        } catch (err) {
            console.error("Load more error:", err);
        } finally {
            setLoadingMore(false);
        }
    };

    return { products, filteredProducts, loading, loadingMore, loadMoreProducts };
};
