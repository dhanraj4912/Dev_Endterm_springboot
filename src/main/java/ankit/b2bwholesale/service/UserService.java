package ankit.b2bwholesale.service;

import ankit.b2bwholesale.entity.User;
import ankit.b2bwholesale.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User register(User user) {
        user.setApproved(false);
        return repo.save(user);
    }
}