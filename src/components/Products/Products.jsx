
import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../Product/Product";
import { Box, Button } from "@mui/material";

export default function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [limit, setLimit] = useState(8);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}&limit=${limit}`
            : `http://localhost:5000/api/products?limit=${limit}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
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
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, limit)
            .map((item) => <Product item={item} key={item.id} />)}

      <Button
        onClick={handleLoadMore}
        variant="contained"
        sx={{ width: "100%", marginTop: "20px" }}
      >
        Load More
      </Button>
    </Box>
  );
}
