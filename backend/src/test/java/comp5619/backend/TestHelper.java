package comp5619.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class TestHelper {
    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static List<Map<String,Object>> getListResponses(MockMvc mockMvc, String url){
        try {

            MvcResult resultActions = mockMvc.perform(get(url))
                    .andExpect(status().isOk())
//                    .andDo(print())
                    .andReturn();

            String contentAsString = resultActions.getResponse().getContentAsString();

            final ObjectMapper mapper = new ObjectMapper();

            List<Map<String,Object>> map = mapper.readValue(contentAsString, ArrayList.class);

            return map;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //this function will return the corresponding id for the new test user
    public static String createTestUser(MockMvc mockMvc,Map<String, String> data) throws Exception {

        mockMvc.perform(post("/users/add")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        Map<String,String> getData = new HashMap<>();
        getData.put("email",data.get("email"));
        getData.put("password",data.get("password"));

        ResultActions resultActions = mockMvc.perform(post("/users/checkSignIn")
                        .content(TestHelper.asJsonString(getData))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                //                .andDo(print())
                .andExpect(status().isOk());

        MvcResult result = resultActions.andReturn();
        String contentAsString = result.getResponse().getContentAsString();

        final ObjectMapper mapper = new ObjectMapper();

        Map<String,Object> map = mapper.readValue(contentAsString, HashMap.class);

        return String.valueOf(map.get("id"));
    }

    public static String createTestShop(MockMvc mockMvc,Map<String, String> data) throws Exception{
        mockMvc.perform(post("/shops/addShop")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        MvcResult resultActions = mockMvc.perform(get("/shops/getAllShopsById/"+data.get("userId")))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = resultActions.getResponse().getContentAsString();

        final ObjectMapper mapper = new ObjectMapper();

        List<Map<String,Object>> map = mapper.readValue(contentAsString, ArrayList.class);

        return String.valueOf(map.get(0).get("id"));
    }

    public static String createTestService(MockMvc mockMvc, Map<String,Object> data) throws Exception{

        mockMvc.perform(post("/services/add")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        MvcResult resultActions = mockMvc.perform(get("/services/getServices/"+data.get("shop_id")))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = resultActions.getResponse().getContentAsString();

        final ObjectMapper mapper = new ObjectMapper();

        List<Map<String,Object>> map = mapper.readValue(contentAsString, ArrayList.class);

        return String.valueOf(map.get(0).get("id"));
    }

    public static void clearTestUserFromDb(MockMvc mockMvc, String idNewUser) throws Exception{

        Map<String,String> data = new HashMap<>();
        data.put("id",idNewUser);

        mockMvc.perform(post("/users/deleteUser")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        mockMvc.perform(get("/users/profile/"+idNewUser))
                .andExpect(status().isNoContent());
    }

    public static void clearTestShopsFromDb(MockMvc mockMvc, String idNewUser) throws Exception{

        Map<String,String> data = new HashMap<>();
        data.put("id",idNewUser);

        mockMvc.perform(post("/shops/deleteShops")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        mockMvc.perform(get("/shops/getAllShopsById/"+idNewUser))
                .andExpect(status().isNoContent());
    }

    public static void clearTestServicesFromDb(MockMvc mockMvc, String idNewShop) throws Exception{

        Map<String,String> data = new HashMap<>();
        data.put("id",idNewShop);

        mockMvc.perform(post("/services/deleteServices")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        mockMvc.perform(get("/services/getServices/"+idNewShop))
                .andExpect(status().isNoContent());
    }


    public static void clearTestCommentsFromDb(MockMvc mockMvc, String idNewService) throws Exception{

        Map<String,String> data = new HashMap<>();
        data.put("service_id",idNewService);

        mockMvc.perform(post("/comments/deleteComments")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        mockMvc.perform(get("/comments/getCommentsById/"+idNewService))
                .andExpect(status().isNoContent());
    }

    public static void clearTestBookingsFromDb(MockMvc mockMvc, String idNewUser) throws Exception{

        Map<String,String> data = new HashMap<>();
        data.put("user_id",idNewUser);

        mockMvc.perform(post("/bookings/deleteBookingsOnUserId")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        mockMvc.perform(get("/bookings/getAllBookings/"+idNewUser))
                .andExpect(status().isNoContent());
    }


    public static void clearTestLikedServiceFromDb(MockMvc mockMvc, String idNewUser) throws Exception{

        Map<String,String> data = new HashMap<>();
        data.put("user_id",idNewUser);

        mockMvc.perform(post("/likedServices/deleteLikedTestLikedServices")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }
}
