
package comp5619.backend.repository;

import comp5619.backend.models.Booking;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BookingRepository extends CrudRepository<Booking, Integer> {

    @Query(value = "SELECT * FROM bookings WHERE user_id=:user_id", nativeQuery = true)
    List<Map<String, Object>> getAllBookingByUserId(@Param("user_id") String user_id);
}

