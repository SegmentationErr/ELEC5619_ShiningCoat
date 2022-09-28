package comp5619.backend.controller;

import comp5619.backend.models.Shop;
import comp5619.backend.repository.ShopRepository;

import java.sql.SQLException;
import java.sql.Time;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.support.Repositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import static java.lang.Float.parseFloat;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/shops")
public class ShopController {
    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private ShopRepository shopRepository;

    @GetMapping(path = "/getAllShopsById/{id}")
    public @ResponseBody ResponseEntity<List<Map<String, Object>>> getAllShopsByUserId(@PathVariable(name = "id") String user_id) {
        List<Map<String, Object>> result = shopRepository.getAllShopsByUserId(user_id);
        if (result.size() == 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(result);
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping(path = "/addShop")
    public @ResponseBody ResponseEntity<Map<String, Object>> addShop(@RequestBody Map<String, String> params) {
        String shopName = params.get("shopName");
        String contactNumber = params.get("contactNumber");
        String startTime = params.get("startTime");
        String endTime = params.get("endTime");

        String image = params.get("image");

        String shopAddress = params.get("shopAddress");
        String shopDescription = params.get("shopDescription");
        String userId = params.get("userId");

        float lat = parseFloat(params.get("lat"));
        float lng = parseFloat(params.get("lng"));

        Map<String, Object> response = new HashMap<>();

        SimpleDateFormat source = new SimpleDateFormat("HH:mm");

        Shop newShop = new Shop();
        newShop.setShopName(shopName);
        newShop.setPhone(contactNumber);
        try {

            newShop.setStartTime(new Time(source.parse(startTime).getTime()));
            newShop.setEndTime(new Time(source.parse(endTime).getTime()));

        } catch (ParseException e) {
            response.put("Message", "Invalid Time");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        newShop.setImage(image);
        newShop.setAddress(shopAddress);
        newShop.setDescription(shopDescription);
        newShop.setUserId(Integer.parseInt(userId));
        newShop.setLat(lat);
        newShop.setLng(lng);

        shopRepository.save(newShop);
        response.put("Message", "Create Shop Success");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @GetMapping(path = "/getShopDetail/{id}")
    public @ResponseBody ResponseEntity<Map<String, Object>> getShopDetail(@PathVariable(name = "id") String shop_id) {
        Map<String, Object> result = shopRepository.getShopDetail(shop_id);
        if (result.size() == 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(result);
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}