package comp5619.backend.controller;

import java.sql.Array;
import java.util.*;
import java.util.stream.Collectors;

import comp5619.backend.repository.BookingRepository;
import comp5619.backend.repository.LikedServiceRepository;
import comp5619.backend.repository.ServiceRepository;
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
@RequestMapping(path = "/recommendation")
public class RecommendationController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private LikedServiceRepository likedServiceRepository;


    private Map<String,List<String>> reformat(List<Map<String,Object>> currentUserLikedServiceRaw ){
        //if the current user have no liked service return no content
        if(currentUserLikedServiceRaw.size() == 0){
            return new HashMap<>();
        }

        Map<String,List<String>> currentUserLikedServiceIdList = new HashMap<>();

        for(Map<String,Object> map:currentUserLikedServiceRaw){
            String userId = String.valueOf(map.get("user_id"));
            String service_id = String.valueOf(map.get("service_id"));

            List<String> li = currentUserLikedServiceIdList.computeIfAbsent(userId, k1 -> new ArrayList<>());

            li.add(service_id);
        }

        return currentUserLikedServiceIdList;
    }

    @GetMapping(path = "/getServicesByRecommendation/{id}")
    public @ResponseBody ResponseEntity<List<Map<String, String>>> getServicesByRecommendation(@PathVariable(name = "id") String id) {

        int k = 3;

        //get the liked services

        List<Map<String,Object>> allLikedServicesRaw = likedServiceRepository.getAllLikedServices();

        Map<String,List<String>> allLikedServices = reformat(allLikedServicesRaw);

        System.out.println(allLikedServices);

        List<String> currentUserLikedServices = allLikedServices.get(id);

        //if the current user have no liked services return no content
        if(currentUserLikedServices == null || currentUserLikedServices.size()==0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        Map<String,Double> distanceMap = new HashMap<>();

        for (String userId: allLikedServices.keySet()) {
            if(!userId.equals(id)){
                List<String> likedServices = allLikedServices.get(id);

                List<String> commonElementList = new ArrayList<>(currentUserLikedServices);

                commonElementList.retainAll(likedServices);

                distanceMap.put(userId,Math.pow(commonElementList.size(),2));
            }
        }

        //get the bookings

        List<Map<String,Object>> allBookingsRaw = bookingRepository.getAllBookings();

        Map<String,List<String>> allBookings = reformat(allBookingsRaw);

        System.out.println(allBookings);

        List<String> currentUserBookings = allBookings.get(id);

        if(currentUserBookings == null){
            currentUserBookings = new ArrayList<>();
        }

        for (String userId: allBookings.keySet()) {
            if(!userId.equals(id) && allBookings.get(id) != null ){
                List<String> bookings = allBookings.get(id);

                List<String> commonElementList = new ArrayList<>(currentUserBookings);

                commonElementList.retainAll(bookings);

                if(distanceMap.containsKey(userId)){
                    double val =Math.pow(commonElementList.size(), 2);
                    double currentVal = distanceMap.get(userId);
                    double newVal = Math.sqrt(currentVal + val);
                    distanceMap.put(userId, newVal);
                }
                else{
                    distanceMap.put(userId, (double)commonElementList.size());
                }
            }
        }

        System.out.println(distanceMap);

        if(distanceMap.size()==0){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        //key: user id , value : distance
        Map<String,Double> topK =
                distanceMap.entrySet().stream()
                        .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                        .limit(k)
                        .collect(Collectors.toMap(
                                Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        System.out.println(topK);

        List<String> idLists = new ArrayList<>(topK.keySet());

        List<Map<String,String>> result = likedServiceRepository.getServicesByIdList(idLists);

        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

}
