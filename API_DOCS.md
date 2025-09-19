# API Documentation

**Base URL:** `/api/v1`

---

## Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | **POST** | Authenticate user and generate token |
| `/auth/logout` | **POST** | Logout user and invalidate token |
| `/auth/register-user` | **POST** | Register a new user |
| `/auth/change-password` | **PATCH** | Change password for authenticated user |
| `/auth/send-otp` | **POST** | Send OTP for account verification |
| `/auth/verify-account` | **PATCH** | Verify user account using OTP |
| `/auth/refresh-token` | **GET** | Refresh authentication token |

---

## User

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/user/upload-picture` | **PATCH** | Upload profile picture |
| `/user/delete-picture` | **DELETE** | Delete profile picture |
| `/user/delete-user` | **DELETE** | Permanently delete account |
| `/user/update-details` | **PATCH** | Update user profile details |
| `/user/me` | **GET** | Get current authenticated user details |
| `/user/forget-password` | **POST** | Request password reset |
| `/user/reset-password` | **PATCH** | Reset password with OTP |
| `/user/deactivate-account` | **PATCH** | Deactivate account temporarily |
| `/user/contact` | **POST** | Submit contact form message |
| `/user/{id}` | **GET** | Get user by ID |
| `/user/stats` | **GET** | Get user statistics |

---

## Product

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/user/product/create` | **POST** | Add new product |
| `/user/product/get/{id}` | **GET** | Get product by ID |
| `/user/product` | **GET** | Get all products |
| `/user/product/delete-product/{id}` | **DELETE** | Delete a product |
| `/user/product/my-products` | **GET** | Get products added by current user |
| `/user/product/update/{id}` | **PATCH** | Update product details |

---

## Reviews

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/review/{productId}` | **POST** | Post a review on a product |
| `/review/my/given` | **GET** | Get reviews given by user |
| `/review/my/received` | **GET** | Get reviews received by user |
| `/review/update/{id}` | **PATCH** | Update a review |
| `/review/my/average` | **GET** | Get average rating stats |
| `/review/my/stats` | **GET** | Get review statistics |
| `/review/delete/{id}` | **DELETE** | Delete review |

---

## Notifications

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/user/notification/` | **GET** | Get all notifications |
| `/user/notification/mark-read/{id}` | **PATCH** | Mark a notification as read |
| `/user/notification/mark-all-read` | **PATCH** | Mark all notifications as read |

---

## Reports

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/report/user/{userId}` | **POST** | Report a user |
| `/report/get-all-reports` | **GET** | Get all reports |
| `/report/product/{productId}` | **POST** | Report a product |
| `/report/delete/{id}` | **DELETE** | Delete a report |

---

## Orders

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/order/request/{productId}` | **POST** | Place an order request |
| `/order/request/my` | **GET** | Get orders requested by current user |
| `/order/request/received` | **GET** | Get orders received by current user |
| `/order/request/accept/{id}` | **PATCH** | Accept order request |
| `/order/request/reject/{id}` | **PATCH** | Reject order request |
| `/order/request/delete/{id}` | **DELETE** | Cancel order request |

---

## Category 

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/category` | **GET** | Get all available categories |
 
---

##  Admin

### Dashboard Stats
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/stats/user` | **GET** | Get user statistics |
| `/admin/stats/product` | **GET** | Get product statistics |
| `/admin/stats/order` | **GET** | Get order statistics |
| `/admin/stats/report` | **GET** | Get report statistics |

### Users
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/get-user/all` | **GET** | Get all users (with search) |
| `/admin/get-user/{id}` | **GET** | Get user by ID |
| `/admin/delete-user/{id}` | **DELETE** | Delete user by ID |

### Categories
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/get-all-category` | **GET** | Get all categories |
| `/admin/create-category` | **POST** | Create new category |
| `/admin/get-single-category/{id}` | **GET** | Get category details |
| `/admin/update-category/{id}` | **PATCH** | Update category |
| `/admin/delete-category/{id}` | **DELETE** | Delete category |
| `/admin/get-category-info` | **GET** | Get category statistics/info |

### Products
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/delete-product/{id}` | **DELETE** | Delete product |
| `/admin/get-all-products` | **GET** | Get all products |
| `/admin/get-single-product/{id}` | **GET** | Get product by ID |

### Reviews
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/get-all-reviews` | **GET** | Get all reviews |
| `/admin/delete-review/{id}` | **DELETE** | Delete review |

### Orders
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/get-all-orders` | **GET** | Get all orders |

### Reports
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/get-all-reports` | **GET** | Get all reports |
| `/admin/resolve-report/{id}` | **PATCH** | Resolve report |
| `/admin/delete-report/{id}` | **DELETE** | Delete report |

---

### Contacts

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/admin/contacts` | **GET** | Retrieve all contact form submissions |
| `/admin/delete-contact/{id}` | **DELETE** | Delete a specific contact request by ID |
