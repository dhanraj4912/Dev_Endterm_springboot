package ankit.b2bwholesale.controller;

import ankit.b2bwholesale.entity.*;
import ankit.b2bwholesale.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public Order createOrder(@RequestParam Long userId,
                             @RequestBody List<OrderItem> items) {
        return service.createOrder(userId, items);
    }
}