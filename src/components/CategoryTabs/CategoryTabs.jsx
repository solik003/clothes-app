import React from "react";
import { Tabs, Tab } from "@mui/material";

export const CategoryTabs = ({ categories, activeTab, onTabChange }) => {
    return (
        <Tabs
            value={activeTab}
            onChange={onTabChange}
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
    );
};
