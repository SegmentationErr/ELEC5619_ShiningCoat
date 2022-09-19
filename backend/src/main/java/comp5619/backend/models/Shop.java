package comp5619.backend.models;
import javax.persistence.*;
import java.sql.Time;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "shops")
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer user_id;

    private String shop_name;

    private String address;

    private String description;

    private String phone;

    private Integer rating;

    private Time start_time;

    private Time end_time;

    private String image;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return user_id;
    }

    public void setUserId(Integer userId) {
        this.user_id = userId;
    }

    public String getShopName() {
        return shop_name;
    }

    public void setShopName(String shopName) {
        this.shop_name = shopName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhone(){
        return phone;
    }

    public void setPhone(String phone){
        this.phone=phone;
    }

    public Integer getRating(){
        return rating;
    }

    public void setRating(Integer rating){
        this.rating = rating;
    }

    public Time getStartTime(){
        return start_time;
    }

    public void setStartTime(Time startTime){
        this.start_time = startTime;
    }

    public Time getEndTime(){
        return end_time;
    }

    public void setEndTime(Time endTime){
        this.end_time=endTime;
    }

    public String getImage(){
        return image;
    }

    public void setImage(String image){
        this.image = image;
    }
}
