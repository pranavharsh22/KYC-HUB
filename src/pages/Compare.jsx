import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { IoCloseCircle } from "react-icons/io5";

const ComparePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [compareList, setCompareList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setAllProducts(response.data.products));

    if (location.state?.product) {
      setCompareList([location.state.product]);
    }
  }, [location.state]);

  const handleAddMore = () => setShowModal(true);

  const handleAddProduct = (product) => {
    if (
      compareList.length < 4 &&
      !compareList.find((p) => p.id === product.id)
    ) {
      setCompareList([...compareList, product]);
    }
  };

  const handleRemoveProduct = (id) => {
    setCompareList(compareList.filter((product) => product.id !== id));
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="compare">
      <Navbar />
      <div className="finalcompare flex">
        <div className="compareupper">
          <Sidebar />
        </div>
        <div className="comparelower">
          <h1>Compare Products</h1>
          <button onClick={handleAddMore}>Add More</button>
          {compareList.length === 0 ? (
            <p>
              No products to compare. Click on Add more button to add products
            </p>
          ) : (
            <table border={1} style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Discount Percentage</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {compareList.map((product) => (
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
                      <button onClick={() => handleRemoveProduct(product.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {showModal && (
            <div className="modal">
              <div className="modal-inside">
                <h2>Select Products to Add</h2>
                <div className="close-btn" onClick={closeModal}>
                  <IoCloseCircle size={30} />
                </div>
                <div className="modal-table">
                  <table border={1} style={{ borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Add</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProducts.map((product) => (
                        <tr key={product.id}>
                          <td>{product.title}</td>
                          <td>{product.description}</td>
                          <td>{product.price}</td>
                          <td>{product.brand}</td>
                          <td>{product.category}</td>
                          <td>
                            <button
                              onClick={() => handleAddProduct(product)}
                              disabled={
                                compareList.length >= 4 ||
                                compareList.find((p) => p.id === product.id)
                              }
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
