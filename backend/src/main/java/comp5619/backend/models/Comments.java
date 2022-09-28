package comp5619.backend.models;
import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "comments")
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer user_id;

    private Integer service_id;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Integer rating;

    private Timestamp time;

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

    public Integer getServiceId() {
        return service_id;
    }

    public void setServiceId(Integer service_id) {
        this.service_id = service_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time){
        this.time=time;
    }
}
