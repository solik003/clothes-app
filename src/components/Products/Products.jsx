
import React, { useMemo, useState } from "react";
import { Product } from "../Product/Product";
import { Button, Stack, Skeleton } from "@mui/material";
import { useProducts } from "../../hooks/useProducts";

export function Products({ query }) {
  const [limit, setLimit] = useState(8);

  const queryWithLimit = useMemo(() => ({
    ...query,
    limit,
  }), [query, limit]);

  const {
    products,
    filteredProducts,
    loading,
    loadingMore,
    loadMoreProducts,
  } = useProducts(queryWithLimit);
  console.log(filteredProducts);

  const displayedProducts = filteredProducts.length > 0 ? filteredProducts : products;
  console.log(displayedProducts);

  const handleLoadMore = async () => {
    const newLimit = limit + 8;
    setLimit(newLimit);
    await loadMoreProducts();
  };


  const showLoadMore = displayedProducts.length >= limit;

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="space-between" p={2}>
      {loading ? (
        Array.from({ length: limit }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width={340}
            height={400}
            sx={{ m: 1 }}
          />
        ))
      ) : (
        displayedProducts.map((item) => (
          <Product key={item._id || item.id} item={item} />
        ))
      )}

      {loadingMore &&
        Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={`more-${i}`}
            variant="rectangular"
            width={340}
            height={400}
            sx={{ m: 1 }}
          />
        ))}

      {!loading && showLoadMore && (
        <Button
          onClick={handleLoadMore}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </Button>
      )}
    </Stack>
  );
}
