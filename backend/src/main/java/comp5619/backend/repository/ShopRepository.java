package comp5619.backend.repository;
import comp5619.backend.models.Shop;

import java.sql.Time;
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

    @Query(value = "select * FROM shops where id=:shop_id", nativeQuery = true)
    Map<String, Object> getShopDetail(@Param("shop_id") String shop_id);


//    @Query(value = "SELECT * FROM shops  WHERE LOWER(shop_name) LIKE :shop_name", nativeQuery = true)
//    List<Map<String, Object>> searchShopsByName(@Param("shop_name") String shop_name);


//    SELECT sh.id, sh.shop_name, sh.image, sh.start_time, sh.end_time, sh.address,
//    ISNULL(se.averagerating, 0) averagerating
//    FROM shops sh
//    LEFT JOIN (SELECT AVG(se.rating) averagerating FROM services se GROUP BY se.shop_id) se ON se.shop_id=sh.id
//    WHERE LOWER(sh.shop_name) LIKE :shop_name
//    ORDER BY ISNULL(se.averagerating, 0) DESC;

    @Query(value =
            "SELECT sh.id, sh.shop_name, sh.image, sh.start_time, sh.end_time, sh.address,\n" +
            "    IFNULL(se.averagerating, 0) averagerating\n" +
            "    FROM shops sh\n" +
            "    LEFT JOIN " +
                    "(SELECT se.shop_id, AVG(se.rating) averagerating FROM services se GROUP BY se.shop_id) se " +
                    "ON se.shop_id=sh.id\n" +
            "    WHERE LOWER(sh.shop_name) LIKE :shop_name\n" +
            "    ORDER BY IFNULL(se.averagerating, 0) DESC", nativeQuery = true)
    List<Map<String, Object>> searchShopsByName(@Param("shop_name") String shop_name);

    @Transactional
    @Modifying
    @Query(value = "UPDATE shops SET shop_name=:shop_name, address=:address, lat=:lat, lng=:lng, description=:description, phone=:phone, start_time=:start_time, end_time=:end_time, image=:image WHERE id=:id", nativeQuery = true)
    void updateShopDetails(@Param("id") String id,
                          @Param("shop_name") String shop_name,
                          @Param("address") String address,
                          @Param("lat") Float lat,
                          @Param("lng") Float lng,
                          @Param("description") String description,
                          @Param("phone") String phone,
                          @Param("start_time") Time start_time,
                          @Param("end_time") Time end_time,
                          @Param("image") String image);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM shops WHERE user_id=:id", nativeQuery = true)
    void deleteShopsOnUserId(@Param("id") String id);

}
