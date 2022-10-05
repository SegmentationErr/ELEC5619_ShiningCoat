
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

    @Query(value = "select b.id, b.user_id, b.service_id, b.shop_id, b.time,b.pick_up, ser.service_name, ser.price, ser.available from bookings b left join services ser on b.service_id = ser.id where b.user_id = :user_id", nativeQuery = true)
    List<Map<String, Object>> getAllBookingByUserId(@Param("user_id") String user_id);

    @Query(value = "select b.id, u.username, b.user_id, b.service_id, b.shop_id, b.time,b.pick_up, ser.service_name, ser.price, ser.available from bookings b left join services ser on b.service_id = ser.id left join users u on u.id = b.user_id where b.shop_id = :shop_id", nativeQuery = true)
    List<Map<String, Object>> getAllBookingsByShopId(@Param("shop_id") String shop_id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM bookings WHERE id=:id", nativeQuery = true)
    void deleteBookingById(@Param("id") String id);

    @Query(value = "SELECT * FROM bookings WHERE id=:id", nativeQuery = true)
    Map<String,Object> getBookingById(@Param("id") String id);


    @Transactional
    @Modifying
    @Query(value = "DELETE FROM bookings WHERE user_id=:id", nativeQuery = true)
    void deleteBookingsOnUserId(@Param("id") String id);
}

