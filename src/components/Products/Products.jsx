
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../Product/Product";
import { Button, Stack, Skeleton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setProducts, setFilteredProducts, setError } from "../../redux/productsRedux";

export function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        let url = `http://localhost:5000/api/products?limit=${limit}`;

        if (cat) {
          url += `&category=${cat}`;
        }

        const res = await axios.get(url);
        setProducts(res.data);
        setTotalCount(res.data.totalCount);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    getProducts();
  }, [cat, limit]);

  useEffect(() => {
    if (cat) {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) => item[key].includes(value))
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?limit=${limit + 8}${cat ? `&category=${cat}` : ""
        }`
      );
      setProducts(res.data);
      setLimit((prevLimit) => prevLimit + 8);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  const isLoadMoreDisabled = cat
    ? filteredProducts.length >= totalCount
    : products.length >= totalCount;

  return (
    <Stack
      direction="row"
      sx={{
        p: 2,
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {loading ? (
        Array.from({ length: limit }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width={340} height={400} sx={{ margin: 1 }} />
        ))
      ) : (
        <>
          {cat
            ? filteredProducts.slice(0, limit).map((item) => (
              <Product item={item} key={item.id} />
            ))
            : products.slice(0, limit).map((item) => (
              <Product item={item} key={item.id} />
            ))}
          {loadingMore &&
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={`skeleton-${index}`}
                variant="rectangular"
                width={340}
                height={400}
                sx={{ margin: 1 }}
              />
            ))}
        </>
      )}

      {cat && (
        <Button
          onClick={handleLoadMore}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoadMoreDisabled}
        >
          {isLoadMoreDisabled ? "No More Products" : "Load More"}
        </Button>
      )}
    </Stack>
  );
}
