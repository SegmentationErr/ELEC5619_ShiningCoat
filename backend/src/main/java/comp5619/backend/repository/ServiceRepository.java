package comp5619.backend.repository;

import comp5619.backend.models.Service;

import java.util.List;
import java.util.Map;
import comp5619.backend.models.Shop;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ServiceRepository extends CrudRepository<Service, Integer> {
    @Query(value = "SELECT * FROM services WHERE id=:id", nativeQuery = true)
    List<Map<String, Object>> getServiceDetailById(@Param("id") String id);
}
