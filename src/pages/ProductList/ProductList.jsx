import Announcement from '../../components/Announcement/Announcement';
import Navbar from "../../components/Navbar/Navbar";
import React from 'react';
import Products from "../../components/Products/Products";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router";
import { useState } from "react";
import { Container, Title, FilterContainer, Filter, FilterText,  Select, Option } from "./ProductList.styles"

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select name="color" onChange={handleFilters}>
                    <Option disabled selected>
                    Color
                    </Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>yellow</Option>
                    <Option>green</Option>
                </Select>
                <Select name="size" onChange={handleFilters}>
                    <Option disabled selected>
                    Size
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={(e) => setSort(e.target.value)}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <Newsletter />
        <Footer />
    </Container>
  );
};

export default ProductList