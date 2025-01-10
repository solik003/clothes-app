
import React, { useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import { categories } from "../../data";
import { Stack, Tabs, Tab, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Categories() {
  const [activeTab, setActiveTab] = useState();

  const topCategories = categories.filter((category) => category.isTop);

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const category = categories[newValue];
    navigate(`/products/${category.cat}`);
  };


  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Top Category Tabs"
        textColor="primary"
        indicatorColor="primary"
      >
        {categories.map((category) => (
          <Tab key={category.id} label={category.title} />
        ))}
      </Tabs>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={{xs: 0, sm: 2}}
        sx={{
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {topCategories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Stack>
    </Box>
  );
}
