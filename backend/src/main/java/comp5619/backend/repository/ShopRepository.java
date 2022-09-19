package comp5619.backend.repository;
import comp5619.backend.models.Shop;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ShopRepository extends CrudRepository<Shop, Integer>{
    @Query(value = "SELECT * FROM shops WHERE user_id=:user_id", nativeQuery = true)
    List<Map<String, Object>> getAllShopsByUserId(@Param("user_id") String user_id);

//    @Transactional
//    @Modifying
//    @Query(value = "UPDATE shops" +
//            "SET user_id=:user_id," +
//            "shop_name=:shop_name," +
//            "address=:address," +
//            "description=:description," +
//            "phone=:phone," +
//            "rating=:rating," +
//            "start_time=:start_time," +
//            "end_time:end_time," +
//            "image=:image" +
//            "WHERE id=:id", nativeQuery = true)
//    void updateUserProfileById(@Param("user_id") String user_id,
//                               @Param("shop_name") String shop_name,
//                               @Param("address") String address,
//                               @Param("description") String description,
//                               @Param("phone") String phone,
//                               @Param("start_time") String start_time,
//                               @Param("end_time") String end_time,
//                               @Param("image") String image
//                               );
}
