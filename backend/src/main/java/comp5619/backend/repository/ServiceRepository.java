package comp5619.backend.repository;

import comp5619.backend.models.Service;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ServiceRepository extends CrudRepository<Service, Integer> {
    @Query(value = "select se.service_name, se.description, se.available, se.pick_up, se.price, se.total_sold, se.image, sh.shop_name, sh.address, sh.lat, sh.lng, sh.start_time, sh.end_time from services se left join shops sh on sh.id = se.shop_id where se.id = 14;", nativeQuery = true)
    Map<String, Object> getServiceDetailById(@Param("id") String id);

    @Query(value = "select sh.lat, sh.lng from shops sh where sh.id=(select shop_id from services where id=:id)", nativeQuery = true)
    Map<String, Object> getMapInfoById(@Param("id") String id);

    @Query(value = "select * from services where shop_id=:shop_id", nativeQuery = true)
    List<Map<String, Object>> getServices(@Param("shop_id") String shop_id);
}
