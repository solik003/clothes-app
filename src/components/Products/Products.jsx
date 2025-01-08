
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../Product/Product";
import { Button, Stack, Skeleton } from "@mui/material";

export function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}&limit=${limit}`
            : `http://localhost:5000/api/products?limit=${limit}`
        );
        setProducts(res.data);
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

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 8);
  };

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
      ) : cat ? (
        filteredProducts.map((item) => <Product item={item} key={item.id} />)
      ) : (
        products.slice(0, limit).map((item) => <Product item={item} key={item.id} />)
      )}

      <Button
        onClick={handleLoadMore}
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Load More
      </Button>
    </Stack>
  );
}
