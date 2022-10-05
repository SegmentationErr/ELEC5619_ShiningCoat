package comp5619.backend.repository;

import comp5619.backend.models.Comments;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface CommentRepository extends CrudRepository<Comments, Integer> {
    @Query(value = "SELECT u.username, c.user_id, c.content, c.id, c.time, c.rating, c.service_id FROM comments c left join users u on u.id=c.user_id where c.service_id =:id", nativeQuery = true)
    List<Map<String, Object>> getCommentsById(@Param("id") String id);


    //This method is used for tests
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM comments WHERE service_id=:service_id", nativeQuery = true)
    void deleteCommentsOnServiceId(@Param("service_id") String service_id);
}
