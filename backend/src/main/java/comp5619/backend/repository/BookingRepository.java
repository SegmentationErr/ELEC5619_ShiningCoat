
package comp5619.backend.repository;

import comp5619.backend.models.Booking;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BookingRepository extends CrudRepository<Booking, Integer> {

    /*
    * select b.id, b.user_id, b.service_id, b.shop_id, b.time,b.pick_up, ser.service_name, ser.price, ser.available
    * from bookings b
    * left join services ser
    * on b.service_id = ser.id
    * where b.user_id = :user_id
    * */

    @Query(value = "select b.id, b.user_id, b.service_id, b.shop_id, b.time,b.pick_up, ser.service_name, ser.price, ser.available from bookings b left join services ser on b.service_id = ser.id where b.user_id = :user_id", nativeQuery = true)
    List<Map<String, Object>> getAllBookingByUserId(@Param("user_id") String user_id);
}
