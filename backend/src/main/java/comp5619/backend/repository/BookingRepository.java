
package comp5619.backend.repository;

import comp5619.backend.models.Booking;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface BookingRepository extends CrudRepository<Booking, Integer> {

    @Query(value = "select b.id, b.user_id, b.service_id, b.shop_id, b.time,b.pick_up, ser.service_name, ser.price, ser.available from bookings b left join services ser on b.service_id = ser.id where (b.user_id = :user_id and ser.available = true)", nativeQuery = true)
    List<Map<String, Object>> getAllBookingByUserId(@Param("user_id") String user_id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM bookings WHERE id=:id", nativeQuery = true)
    void deleteBookingById(@Param("id") String id);

    @Query(value = "SELECT * FROM bookings WHERE id=:id", nativeQuery = true)
    Map<String,Object> getBookingById(@Param("id") String id);
}

