import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function Menuitems() {
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setIsNewCategory(selectedCategory === 'Other');
  };

  return (
    <div className="container">
      <h2>Add Menu Item</h2>
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" id="name" placeholder="Enter item name" />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" id="description" placeholder="Enter item description" />
        </FormGroup>

        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="number" id="price" placeholder="Enter item price" />
        </FormGroup>

        <FormGroup>
          <Label for="category">Category</Label>
          <Input type="select" id="category" value={category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            <option value="">Petit Dejuner</option>
            <option value=" ">Cafee</option>
            <option value="">Nesspresso</option>
            <option value="">the</option>
            <option value="">jus coctaile</option>

            <option value="Other">Other</option>
          </Input>
        </FormGroup>

        {isNewCategory && (
          <FormGroup>
            <Label for="newCategory">New Category</Label>
            <Input 
              type="text" 
              id="newCategory" 
              value={newCategory} 
              onChange={(e) => setNewCategory(e.target.value)} 
              placeholder="Enter new category" 
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label for="image">Image</Label>
          <Input type="file" id="image" />
        </FormGroup>

        <Button color="primary">Add Menu Item</Button>
      </Form>
    </div>
  );
}

export default Menuitems;
