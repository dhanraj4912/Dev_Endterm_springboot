package ankit.b2bwholesale.repository;

import ankit.b2bwholesale.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}