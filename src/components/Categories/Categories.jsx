
import React, { useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import { categories } from "../../data";
import { Stack, Tabs, Tab, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CategoryTabs } from "../CategoryTabs/CategoryTabs";

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
    <Box width="100%" p={2}>
      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={{ xs: 0, sm: 2 }}
        justifyContent = "space-between"
        flexWrap = "wrap"
      >
        {topCategories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Stack>
    </Box>
  );
}
