package ankit.b2bwholesale.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;   // base price (optional use)

    private int moq;
    private int stock;

    // 🔥 TIER PRICING FIELDS
    private double price10;    // 1–10 quantity
    private double price50;    // 11–50 quantity
    private double price100;   // 50+ quantity

    // ===== GETTERS & SETTERS =====

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getMoq() { return moq; }
    public void setMoq(int moq) { this.moq = moq; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    // 🔥 Tier Pricing Getters/Setters

    public double getPrice10() { return price10; }
    public void setPrice10(double price10) { this.price10 = price10; }

    public double getPrice50() { return price50; }
    public void setPrice50(double price50) { this.price50 = price50; }

    public double getPrice100() { return price100; }
    public void setPrice100(double price100) { this.price100 = price100; }
}