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

    @Query(value = "select * FROM shops where id=:shop_id", nativeQuery = true)
    Map<String, Object> getShopDetail(@Param("shop_id") String shop_id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE services SET service_name=:service_name, description=:description, available=:available, pick_up=:pick_up, price=:price, image=:image WHERE id=:id", nativeQuery = true)
    void updateShopDetails(@Param("id") String id,
                          @Param("service_name") String service_name,
                          @Param("description") String description,
                          @Param("available") String available,
                          @Param("pick_up") String pick_up,
                          @Param("price") String price,
                          @Param("image") String image);

}
