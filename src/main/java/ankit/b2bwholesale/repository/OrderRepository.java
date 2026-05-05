package ankit.b2bwholesale.repository;

import ankit.b2bwholesale.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}