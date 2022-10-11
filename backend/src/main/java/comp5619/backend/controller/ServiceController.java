package comp5619.backend.controller;

import comp5619.backend.models.Service;
import comp5619.backend.repository.ServiceRepository;

import java.sql.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import comp5619.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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


@Controller // This means that this class is a Controller
@RequestMapping(path = "/services")
public class ServiceController {
    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private ServiceRepository serviceRepository;

    @GetMapping(path = "/getServiceDetailById/{id}")
    public @ResponseBody ResponseEntity<Map<String, Object>> getServiceDetailById(@PathVariable(name = "id") String id) {
        Map<String, Object> result = serviceRepository.getServiceDetailById(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping(path = "/getMapInfoById/{id}")
    public @ResponseBody ResponseEntity<Map<String, Object>> getMapInfoById(@PathVariable(name = "id") String id) {
        Map<String, Object> result = serviceRepository.getMapInfoById(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping(path = "/getServices/{id}")
    public @ResponseBody ResponseEntity<List<Map<String, Object>>> getServices(@PathVariable(name = "id") String shop_id) {
        List<Map<String, Object>> result = serviceRepository.getServices(shop_id);
        if (result.size() == 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(result);
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

    @GetMapping(path = "/search/{name}")
    public @ResponseBody ResponseEntity<List<Map<String, Object>>> searchServicesByName(@PathVariable(name = "name") String service_name) {
        List<Map<String, Object>> result = serviceRepository.searchServicesByName('%'+service_name+'%');
        if (result.size() == 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(result);
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

    @GetMapping(path = "/getAllServicesByRating")
    public @ResponseBody ResponseEntity<List<Map<String, Object>>> getAllServicesByRating() {
        List<Map<String, Object>> result = serviceRepository.getAllServicesByRating();
        if (result.size() == 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(result);
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping(path = "/add")
    public @ResponseBody ResponseEntity<Map<String, Object>> addService(@RequestBody Map<String, Object> params) {
        Map<String, Object> response = new HashMap<>();

        Service newService = new Service();
        newService.setAvailable((int)params.get("available"));
        newService.setDescription((String)params.get("serviceDescription"));
        newService.setImage((String)params.get("image"));
        newService.setPick_up((int)params.get("pickup"));
        newService.setPrice(Float.parseFloat((String)params.get("price")));
        newService.setService_name((String)params.get("serviceName"));
        newService.setShop_id((int)params.get("shop_id"));
        newService.setRating(0);
        newService.setTotal_sold(0);

        serviceRepository.save(newService);

        response.put("Message", "Create Service Success");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping(path = "/update")
    public @ResponseBody ResponseEntity<Object> updataService(@RequestBody Map<String, String> params) {
        serviceRepository.updateServiceyId(params.get("service_id"),
                params.get("serviceName"),
                params.get("serviceDescription"),
                params.get("available"),
                params.get("pickup"),
                params.get("price"),
                params.get("image"));

        return ResponseEntity.status(HttpStatus.OK).body("Update Success");
    }


    @PostMapping(path = "/updateServiceRating")
    public @ResponseBody ResponseEntity<Object> updateServiceRating(@RequestBody Map<String, String> params) {

        serviceRepository.updateServiceRating(params.get("serviceId"));

        return ResponseEntity.status(HttpStatus.OK).body("Update Success");
    }

    @PostMapping(path = "/updateTotalSold")
    public @ResponseBody ResponseEntity<Object> updateServiceTotalSold(@RequestBody Map<String, String> params) {

        serviceRepository.updateServiceTotalSold(params.get("id"),params.get("value"));

        return ResponseEntity.status(HttpStatus.OK).body("Update Success");
    }

    //this method is used for test only
    @PostMapping(path = "/deleteServices")
    public @ResponseBody ResponseEntity<Object> deleteShopsByUserId(@RequestBody Map<String, String> params) {

        String id = params.get("id");

        List<Map<String,Object>> result = serviceRepository.getServices(id);

        if (result.size() == 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
        }

        serviceRepository.deleteServicesOnShopId(id);

        return ResponseEntity.status(HttpStatus.OK).body("Delete Services On Shop ID: "+id+" Success");
    }

}
