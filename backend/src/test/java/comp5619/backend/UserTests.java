package comp5619.backend;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.*;


//This class is only for the demo of the basic tests for GET and POST actions for backend
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTests{

    private String userNameNewUser = "Users Used For Test";
    private String emailNewUser = "testUserEmail@test.com";
    private final String roleNewUser = "customer";
    private final String passwordNewUser = "123456789";

    private String idNewUser = "";

    @Test
    public void testCreateNewUser(MockMvc mockMvc) throws Exception {

        System.out.println("Run Test Create User");

        Map<String,String> data = new HashMap<>();
        data.put("username",userNameNewUser);
        data.put("email",emailNewUser);
        data.put("role",roleNewUser);
        data.put("password",passwordNewUser);

        mockMvc.perform(post("/users/add")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        System.out.println("Done Test Create User");
    }

    @Test
    public void testSignIn(MockMvc mockMvc) throws Exception {

        System.out.println("Run Test Sign In");

        Map<String,String> data = new HashMap<>();
        data.put("email",emailNewUser);
        data.put("password",passwordNewUser);

        ResultActions resultActions = mockMvc.perform(post("/users/checkSignIn")
                .content(TestHelper.asJsonString(data))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
                .andExpect(status().isOk());

        MvcResult result = resultActions.andReturn();
        String contentAsString = result.getResponse().getContentAsString();

        final ObjectMapper mapper = new ObjectMapper();

        Map<String,Object> map = mapper.readValue(contentAsString, HashMap.class);

        idNewUser = String.valueOf(map.get("id"));

        System.out.println("Done Test Sign In");
    }

    @Test
    public void testGetUserProfileById(MockMvc mockMvc) throws Exception {

        System.out.println("Run Test Get User Profile");

        mockMvc.perform(get("/users/profile/"+this.idNewUser))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role", is(this.roleNewUser)))
                .andExpect(jsonPath("$.email", is(this.emailNewUser)))
                .andExpect(jsonPath("$.username", is(this.userNameNewUser)));

        System.out.println("Done Test Get User Profile");
    }

    @Test
    public void testUpdateUserProfile(MockMvc mockMvc) throws Exception {

        System.out.println("Run Test Update User Profile");

        Map<String,String> data = new HashMap<>();
        data.put("id",idNewUser);

        this.userNameNewUser = "updated test user name";
        data.put("username",userNameNewUser);

        this.emailNewUser = "testUpdatedUserEmail@test.com";
        data.put("email",emailNewUser);

        data.put("currPassword",passwordNewUser);
        data.put("newPassword",passwordNewUser);

        mockMvc.perform(post("/users/update")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mockMvc.perform(get("/users/profile/"+this.idNewUser))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role", is(this.roleNewUser)))
                .andExpect(jsonPath("$.email", is(this.emailNewUser)))
                .andExpect(jsonPath("$.username", is(this.userNameNewUser)));

        System.out.println("Done Test Update User Profile");
    }

    @Test
    public void clearTestUserFromDb(MockMvc mockMvc) throws Exception{
        System.out.println("Run Test Delete Test User");

        Map<String,String> data = new HashMap<>();
        data.put("id",idNewUser);

        mockMvc.perform(post("/users/deleteUser")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        mockMvc.perform(get("/users/profile/"+this.idNewUser))
                .andExpect(status().isNoContent());

        System.out.println("Done Test Delete Test User");
    }

    @Test
    public void runAll(MockMvc mockMvc) throws Exception{
        testCreateNewUser(mockMvc);
        testSignIn(mockMvc);
        testGetUserProfileById(mockMvc);
        testUpdateUserProfile(mockMvc);
        clearTestUserFromDb(mockMvc);
    }
}
