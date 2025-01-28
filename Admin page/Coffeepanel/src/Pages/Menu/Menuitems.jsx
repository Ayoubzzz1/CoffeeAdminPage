import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function Menuitems() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    newCategory: "",
    image: ""
  });
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageError, setImageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const MAX_IMAGE_SIZE = 500 * 1024; // 500KB
  const MAX_WIDTH = 800;
  const MAX_HEIGHT = 800;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#FFFFFF'; // White background
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Start with high quality
          let quality = 0.9;
          let base64 = canvas.toDataURL('image/jpeg', quality);

          // Reduce quality until file size is under MAX_IMAGE_SIZE
          while (base64.length > MAX_IMAGE_SIZE * 1.37 && quality > 0.1) { // 1.37 factor for base64 overhead
            quality -= 0.1;
            base64 = canvas.toDataURL('image/jpeg', quality);
          }

          resolve(base64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const validateImage = async (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      setImageError("Please upload only JPG, JPEG or PNG images");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB initial check
      setImageError("Image size should be less than 5MB");
      return false;
    }

    setImageError("");
    return true;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (await validateImage(file)) {
        try {
          setIsLoading(true);
          const compressedBase64 = await compressImage(file);
          setFormData(prev => ({
            ...prev,
            image: compressedBase64
          }));
          setIsLoading(false);
        } catch (error) {
          console.error("Error compressing image:", error);
          setImageError("Error processing image. Please try another image.");
          setIsLoading(false);
        }
      } else {
        e.target.value = null;
        setFormData(prev => ({
          ...prev,
          image: ""
        }));
      }
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setIsNewCategory(selectedCategory === "Other");
    setFormData(prev => ({
      ...prev,
      category: selectedCategory,
      newCategory: selectedCategory === "Other" ? "" : prev.newCategory
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.price || parseFloat(formData.price) <= 0) return "Valid price is required";
    if (!formData.image) return "Image is required";
    if (isNewCategory && !formData.newCategory.trim()) return "New category name is required";
    if (!isNewCategory && !formData.category) return "Category is required";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    const selectedCategory = isNewCategory ? formData.newCategory : formData.category;

    try {
      setIsLoading(true);

      // First, try to add the new category if needed
      if (isNewCategory && formData.newCategory) {
        const categoryResponse = await fetch("http://localhost:5000/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category: formData.newCategory }),
        });
        
        if (!categoryResponse.ok) {
          throw new Error("Failed to add new category");
        }
      }

      // Then add the menu item
      const menuItemFormData = new FormData();
      menuItemFormData.append("name", formData.name.trim());
      menuItemFormData.append("description", formData.description.trim());
      menuItemFormData.append("price", formData.price);
      menuItemFormData.append("category", selectedCategory.trim());
      menuItemFormData.append("image", formData.image);

      const response = await fetch("http://localhost:5000/api/menuitems", {
        method: "POST",
        body: menuItemFormData,
      });

      if (response.ok) {
        alert("Menu item added successfully!");
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          newCategory: "",
          image: ""
        });
        setIsNewCategory(false);
        fetchCategories();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add menu item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while adding the menu item.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Menu Item</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={handleInputChange}
            maxLength={100}
            disabled={isLoading}
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            id="description"
            placeholder="Enter item description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={500}
            disabled={isLoading}
          />
        </FormGroup>

        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            type="number"
            id="price"
            placeholder="Enter item price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            disabled={isLoading}
          />
        </FormGroup>

        <FormGroup>
          <Label for="category">Category</Label>
          <Input 
            type="select" 
            id="category" 
            value={formData.category}
            onChange={handleCategoryChange}
            disabled={isLoading}
          >
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
              value={formData.newCategory}
              onChange={handleInputChange}
              placeholder="Enter new category"
              maxLength={50}
              disabled={isLoading}
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label for="image">Image</Label>
          <Input 
            type="file" 
            id="image" 
            onChange={handleImageChange}
            accept="image/jpeg,image/png,image/jpg"
            disabled={isLoading}
          />
          {imageError && (
            <div className="text-danger mt-1">{imageError}</div>
          )}
        </FormGroup>

        <Button color="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Add Menu Item"}
        </Button>
      </Form>
    </div>
  );
}

export default Menuitems;