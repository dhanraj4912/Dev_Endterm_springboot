# 🛒 Wholesale / Bulk Order Management System

## 📌 Overview

A **B2B bulk ordering platform** that allows retailers to purchase products from wholesalers with support for **MOQ, tiered pricing, and credit-based checkout**.

This project focuses on delivering **core wholesale functionality** with a simple and efficient workflow.

---

## 🚀 Core Features (Implemented)

### 👤 Buyer (Retailer)

* Register & Login (basic)
* Browse product catalog
* Add items to cart
* **MOQ validation** (cannot order below minimum)
* **Dynamic pricing (tier-based)** based on quantity
* Checkout using:

  * Pay Now
  * Credit (if within limit)
* **Quick Reorder / CSV Upload** (basic demo)

---

### 🏢 Admin (Wholesaler)

* Approve/reject retailer accounts
* Add/manage products
* Set:

  * MOQ
  * Price tiers
* Process orders
* Set credit limit for users

---

## ⚙️ Core Functionalities

* ✅ **Tiered Pricing**

  * Price changes automatically based on quantity

* ✅ **MOQ Enforcement**

  * Prevent checkout if MOQ not met

* ✅ **Credit System**

  * Track user credit
  * Block order if limit exceeded

* ✅ **Invoice Generation (Basic)**

  * Simple invoice (text/PDF)

* ✅ **CSV Bulk Upload (Basic)**

  * Upload file to add items to cart

---

## 🧱 Tech Stack

### Frontend

* React

### Backend

* Spring Boot
* Spring Data JPA

### Database

* PostgreSQL

---

## 🔄 Flow

```id="flow1"
Register → Admin Approves → Login → Add to Cart →
MOQ Check → Tier Price Applied → Checkout →
Credit Check → Order Placed
```

---

## 📂 Backend Structure

```id="struct1"
controller  → APIs
service     → business logic
repository  → DB
entity      → tables
```

---

## 🎯 What is Covered

* B2B ordering flow ✔
* Tier pricing ✔
* MOQ validation ✔
* Credit limit check ✔
* Order placement ✔

---

## 🏁 Conclusion

A **minimal working B2B wholesale system** demonstrating key concepts like pricing tiers, MOQ enforcement, and credit-based ordering within limited development time.

---
