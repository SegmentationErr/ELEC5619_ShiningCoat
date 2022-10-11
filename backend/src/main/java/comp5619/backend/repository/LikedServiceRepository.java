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

    @Query(value = "SELECT se.id as service_id, se.service_name FROM services se LEFT JOIN liked_services l ON l.service_id=se.id WHERE l.user_id=:user_id", nativeQuery = true)
    List<Map<String, String>> getLikedServicesById(@Param("user_id") String user_id);

    @Query(value = "SELECT se.id as service_id, se.service_name , l.user_id FROM liked_services l  LEFT JOIN services se ON l.service_id=se.id", nativeQuery = true)
    List<Map<String, Object>> getAllLikedServices();

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM liked_services WHERE user_id=:user_id AND service_id=:service_id", nativeQuery = true)
    void unLikeService(@Param("user_id") String user_id, @Param("service_id") String service_id);


    @Transactional
    @Modifying
    @Query(value = "DELETE FROM liked_services WHERE user_id=:user_id", nativeQuery = true)
    void deleteLikedTestLikedServices(@Param("user_id") String user_id);


    @Query(value = "SELECT DISTINCT se.id, se.service_name,  se.rating, se.available, se.image, sh.address, sh.start_time, sh.end_time from services se left join shops sh on sh.id=se.shop_id LEFT JOIN liked_services l ON l.service_id=se.id WHERE l.user_id IN (:idList)", nativeQuery = true)
    List<Map<String, String>> getServicesByIdList(@Param("idList") List<String> idList);

}
