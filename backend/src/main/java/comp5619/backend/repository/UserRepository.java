package comp5619.backend.repository;

import comp5619.backend.models.User;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {
    @Query(value = "SELECT username, email, role FROM users WHERE id=:id", nativeQuery = true)
    Map<String, Object> getUserProfileById(@Param("id") String id);

    @Query(value = "SELECT * FROM users WHERE id=:id and password=:password", nativeQuery = true)
    Map<String, Object> checkUserPasswordById(@Param("id") String id, @Param("password") String password);

    @Transactional
    @Modifying
    @Query(value = "UPDATE users SET username=:username, email=:email, password=:password WHERE id=:id", nativeQuery = true)
    void updateUserProfileById(@Param("id") String id,
            @Param("username") String username,
            @Param("email") String email,
            @Param("password") String password);

    @Query(value = "SELECT * FROM users WHERE username=:username or email=:email", nativeQuery = true)
    List<Map<String, Object>> getUserByNameOrEmail(@Param("username") String username, @Param("email") String email);

    @Query(value = "SELECT * FROM users WHERE email=:email and password=:password", nativeQuery = true)
    Map<String, Object> getUserByEmailandPassword(@Param("email") String email, @Param("password") String password);
}