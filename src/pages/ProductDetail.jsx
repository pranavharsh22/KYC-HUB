import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending
  const productsPerPage = 10;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products));
  }, []);

  // Function to sort products based on price
  const sortProducts = (products, order) => {
    return products.slice().sort((a, b) => {
      if (order === "asc") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
  };

  // function for filtering based on category
  const filterProductsByCategory = (products, category) => {
    if (category === "all") {
      return products;
    }
    return products.filter((product) => product.category === category);
  };
  // Calculate the index of the first and last product to be displayed
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = filterProductsByCategory(products, selectedCategory);
  const sortedProducts = sortProducts(filteredProducts, sortOrder);
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle sort order change
  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to first page on category change
  };
  // handling compare
  const handleCompare = (product) => {
    navigate("/compare", { state: { product } });
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="details">
      <Navbar />
      <div className="product flex">
        <div className="upperpart">
          <Sidebar />
        </div>
        <div className="lowerpart">
          <button onClick={handleSortChange}>
            Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ marginBottom: "10px" }}
          >
            <option value="all">All Categories</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
          </select>
          <table border={1}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Discount Percentage</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Image</th>
                <th>Compare</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td align="center">{product.title}</td>
                  <td align="center">{product.description}</td>
                  <td align="center">{product.price}</td>
                  <td align="center">{product.discountPercentage}</td>
                  <td align="center">{product.brand}</td>
                  <td align="center">{product.category}</td>
                  <td>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td>
                    <button
                      style={{ height: "100%" }}
                      onClick={() => handleCompare(product)}
                    >
                      Compare
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                style={{
                  backgroundColor:
                    currentPage === number ? "lightblue" : "white",
                  color: "#000",
                }}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
