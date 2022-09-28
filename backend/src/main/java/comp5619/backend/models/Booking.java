package comp5619.backend.models;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer user_id;

    private Integer service_id;

    private Integer shop_id;

    private Timestamp time;

    private Integer pick_up;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return user_id;
    }

    public void setUserId(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getService_id() {
        return service_id;
    }

    public void setService_id(Integer service_id) {
        this.service_id = service_id;
    }

    public Integer getShopId() {
        return shop_id;
    }

    public void setShopId(Integer shop_id) {
        this.shop_id = shop_id;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public Integer getPickUp() {
        return pick_up;
    }

    public void setPickUp(Integer pick_up) {
        this.pick_up = pick_up;
    }
}
