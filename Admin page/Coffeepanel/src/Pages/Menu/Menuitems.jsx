import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function Menuitems() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [image, setImage] = useState(""); // Base64 string
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setIsNewCategory(selectedCategory === "Other");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 image string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedCategory = isNewCategory ? newCategory : category;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", selectedCategory);
    formData.append("image", image); // Sending Base64 image string

    try {
      const response = await fetch("http://localhost:5000/api/menuitems", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Menu item added successfully!");

        // Add new category to the backend if it's a new one
        if (isNewCategory && newCategory) {
          await fetch("http://localhost:5000/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: newCategory }),
          });

          setCategory(newCategory);
          setIsNewCategory(false);
          setNewCategory("");

          // Refresh categories from the backend
          const updatedCategories = await fetch("http://localhost:5000/api/categories").then((res) =>
            res.json()
          );
          setCategories(updatedCategories);
        }
      } else {
        alert("Failed to add menu item.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the menu item.");
    }
  };

  return (
    <div className="container">
      <h2>Add Menu Item</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            id="description"
            placeholder="Enter item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            type="number"
            id="price"
            placeholder="Enter item price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="category">Category</Label>
          <Input type="select" id="category" value={category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
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
          <Input type="file" id="image" onChange={handleImageChange} />
        </FormGroup>

        <Button color="primary" type="submit">
          Add Menu Item
        </Button>
      </Form>
    </div>
  );
}

export default Menuitems;
