import React from 'react'
import CategoryItem from '../CategoryItem/CategoryItem';
import { categories } from "../../data";
import { Container } from './Categories.styles';

const Categories = () => {
    return (
        <Container>
          {categories.map((item) => (
            <CategoryItem item={item} key={item.id} />
          ))}
        </Container>
    );
}

export default Categories