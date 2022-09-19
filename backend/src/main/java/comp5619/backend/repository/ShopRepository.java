package comp5619.backend.repository;
import comp5619.backend.models.Shop;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ShopRepository {
    @Query(value = "SELECT * FROM shops WHERE user_id=:id", nativeQuery = true)
    List<Map<String, Object>> getAllShopsByUserId(@Param("user_id") String id);

//    @Transactional
//    @Modifying
//    @Query(value = "UPDATE users SET username=:username, email=:email, password=:password WHERE id=:id", nativeQuery = true)
//    void updateUserProfileById(@Param("id") String id,
//                               @Param("username") String username,
//                               @Param("email") String email,
//                               @Param("password") String password);
}
