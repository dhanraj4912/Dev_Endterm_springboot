package ankit.b2bwholesale.service;

import ankit.b2bwholesale.entity.*;
import ankit.b2bwholesale.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final OrderItemRepository itemRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public OrderService(OrderRepository orderRepo,
                        OrderItemRepository itemRepo,
                        ProductRepository productRepo,
                        UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.itemRepo = itemRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    public Order createOrder(Long userId, List<OrderItem> items) {

        // 🔥 STEP 1: USER FETCH
        User user = userRepo.findById(userId.intValue())
                .orElseThrow(() -> new RuntimeException("User not found"));

        double total = 0;

        for (OrderItem item : items) {

            Product p = productRepo.findById(item.getProductId()).orElse(null);

            if (p == null) {
                throw new RuntimeException("Product not found: " + item.getProductId());
            }

            int qty = item.getQuantity();

            // MOQ CHECK
            if (qty < p.getMoq()) {
                throw new RuntimeException("MOQ not satisfied for product: " + p.getName());
            }

            // STOCK CHECK
            if (p.getStock() < qty) {
                throw new RuntimeException("Not enough stock for: " + p.getName());
            }

            // 🔥 TIER PRICING
            double price;

            if (qty <= 10) {
                price = p.getPrice10();
            } else if (qty <= 50) {
                price = p.getPrice50();
            } else {
                price = p.getPrice100();
            }

            total += price * qty;

            // reduce stock
            p.setStock(p.getStock() - qty);
            productRepo.save(p);

            item.setPrice(price);
        }

        // 🔥 STEP 2: CREDIT CHECK
        if (user.getUsedCredit() + total > user.getCreditLimit()) {
            throw new RuntimeException("Credit limit exceeded!");
        }

        // 🔥 STEP 3: SAVE ORDER
        Order order = new Order();
        order.setUserId(userId);
        order.setTotalAmount(total);

        Order savedOrder = orderRepo.save(order);

        // save order items
        for (OrderItem item : items) {
            item.setOrderId(savedOrder.getId());
            itemRepo.save(item);
        }

        // 🔥 STEP 4: UPDATE CREDIT
        user.setUsedCredit(user.getUsedCredit() + total);
        userRepo.save(user);

        return savedOrder;
    }
}