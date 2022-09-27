package comp5619.backend.models;

import javax.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer shop_id;

    private String service_name;

    private String description;

    private Integer available;

    private Integer pick_up;

    private Float price;

    private Integer total_sold;

    @Lob
    private String image;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getShop_id() {
        return shop_id;
    }

    public void setShop_id(Integer shop_id) {
        this.shop_id = shop_id;
    }

    public String getService_name() {
        return service_name;
    }

    public void setService_name(String service_name) {
        this.service_name = service_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAvailable() {
        return available;
    }

    public void setAvailable(Integer available) {
        this.available = available;
    }

    public Integer getPick_up() {
        return pick_up;
    }

    public void setPick_up(Integer pick_up) {
        this.pick_up = pick_up;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getTotal_sold() {
        return total_sold;
    }

    public void setTotal_sold(Integer total_sold) {
        this.total_sold = total_sold;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}

