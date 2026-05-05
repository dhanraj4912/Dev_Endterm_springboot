package ankit.b2bwholesale.repository;

import ankit.b2bwholesale.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
