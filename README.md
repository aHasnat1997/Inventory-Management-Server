# 💻 Computer Inventory Management Server

This project is a Computer Store Management Dashboard Server aimed at providing efficient management of computer inventory and sales. It is built using Express, TypeScript, Mongoose, Zod, and jsonwebtoken for authentication. The server provides various features including authentication, CRUD operations for managing inventory, sales management, and comprehensive filtering options for optimizing inventory management.

## 🚀 Features

### 1. Authentication
- **User Registration and Login**: Users are required to register and log in to access the dashboard. JWT (JSON Web Tokens) are used for secure authentication.

### 2. Functionality
- **CRUD Operations**: Users can perform CRUD operations on computer items in the inventory.
  - **Create**: Add a new computer item to the inventory.
  - **Read**: View the list of computer items.
  - **Update**: Update computer item details.
  - **Delete**: Remove computer items from the inventory.
- **Robust Filtering System**: Implement a robust filtering system to effectively narrow down computer item selections based on various criteria.
- **Bulk Delete**: Users can efficiently manage their inventory by implementing a bulk delete feature for computer items.

### 3. Sales Management
- **Create Sale**: Users can create sales transactions, providing details such as quantity, buyer name, product name, price, and sale date.
- **Real-time Stock Management**: The available stock of a product is updated after each sale. If the quantity reaches zero, the product is automatically removed from the inventory.

### 4. Comprehensive Filtering System
- **Category Filter**: Users can filter by specific computer item categories (e.g., monitors, RAM, graphics cards).
- **Brand Filter**: Real-time search functionality is provided for computer item brands.
- **Compatibility Filter**: Users can filter by compatibility with different systems (e.g., Windows, Mac).
- **Price Range Filter**: Filter computer items based on price range.
- **Interface Filter**: Filter by interface types (e.g., USB, HDMI, Thunderbolt).
- **Condition Filter**: Filter for new or used items.
- **Capacity Filter**: Include a filter for items with varying capacities (e.g., storage capacity for hard drives).
- **Additional Parameters**: Introduce other relevant filter parameters such as color, form factor, or any custom attributes associated with the computer items.

## 💻 Technologies Used
- Express
- TypeScript
- Mongoose
- Zod
- jsonwebtoken

## 🛠️ Getting Started
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables.
4. Run the server using `npm start`.

## 📄 API Documentation
Detailed API documentation can be found [here](api-documentation.md).
