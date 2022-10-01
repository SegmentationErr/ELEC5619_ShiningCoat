package comp5619.backend.repository;

import comp5619.backend.models.Comments;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends CrudRepository<Comments, Integer> {
    @Query(value = "SELECT u.username, c.content, c.time, c.rating\n FROM comments c left join users u on u.id=c.user_id where c.service_id =:id", nativeQuery = true)
    List<Map<String, Object>> getCommentsById(@Param("id") String id);
}
