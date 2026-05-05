package ankit.b2bwholesale.repository;

import ankit.b2bwholesale.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}