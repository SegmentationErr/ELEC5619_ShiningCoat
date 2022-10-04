package comp5619.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
}
