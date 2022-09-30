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

}
