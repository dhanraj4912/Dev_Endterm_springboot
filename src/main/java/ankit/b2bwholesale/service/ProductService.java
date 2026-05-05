package ankit.b2bwholesale.service;

import ankit.b2bwholesale.entity.Product;
import ankit.b2bwholesale.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public Product addProduct(Product product) {
        return repo.save(product);
    }

    // GET BY ID
    public Product getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // GET ALL
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    // DELETE
    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }

    // UPDATE
    public Product updateProduct(Long id, Product newProduct) {
        Product p = repo.findById(id).orElse(null);
        if (p != null) {
            p.setName(newProduct.getName());
            p.setPrice(newProduct.getPrice());
            p.setMoq(newProduct.getMoq());
            p.setStock(newProduct.getStock());
            return repo.save(p);
        }
        return null;
    }


}