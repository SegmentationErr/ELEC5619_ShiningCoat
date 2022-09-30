package comp5619.backend.repository;

import comp5619.backend.models.Service;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

public interface ServiceRepository extends CrudRepository<Service, Integer> {
    @Query(value = "select se.service_name, se.description, se.available, se.pick_up, se.price, se.total_sold, se.image, sh.shop_name, sh.address, sh.lat, sh.lng, sh.start_time, sh.end_time from services se left join shops sh on sh.id=se.shop_id where se.id =:id", nativeQuery = true)
    Map<String, Object> getServiceDetailById(@Param("id") String id);

    @Query(value = "select sh.lat, sh.lng from shops sh where sh.id=(select shop_id from services where id=:id)", nativeQuery = true)
    Map<String, Object> getMapInfoById(@Param("id") String id);

    @Query(value = "select * from services where shop_id=:shop_id", nativeQuery = true)
    List<Map<String, Object>> getServices(@Param("shop_id") String shop_id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE services SET service_name=:service_name, description=:description, available=:available, pick_up=:pick_up, price=:price, image=:image WHERE id=:id", nativeQuery = true)
    void updateServiceyId(@Param("id") String id,
            @Param("service_name") String service_name,
            @Param("description") String description,
            @Param("available") String available,
            @Param("pick_up") String pick_up,
            @Param("price") String price,
            @Param("image") String image);
}
