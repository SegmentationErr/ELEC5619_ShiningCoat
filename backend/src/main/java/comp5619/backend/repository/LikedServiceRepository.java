package comp5619.backend.repository;

import comp5619.backend.models.LikedService;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface LikedServiceRepository extends CrudRepository<LikedService, Integer> {
    @Query(value = "SELECT COUNT(*) FROM liked_services WHERE user_id=:user_id AND service_id=:service_id", nativeQuery = true)
    int getLikedServiceCount(@Param("user_id") String user_id, @Param("service_id") String service_id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM liked_services WHERE user_id=:user_id AND service_id=:service_id", nativeQuery = true)
    void unLikeService(@Param("user_id") String user_id, @Param("service_id") String service_id);
}
