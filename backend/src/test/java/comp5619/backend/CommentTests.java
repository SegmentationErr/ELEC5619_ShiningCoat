package comp5619.backend;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import org.junit.Assert.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.hamcrest.Matchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest

public class CommentTests {

    private String userNameNewUser = "Business Users Used For Test";
    private String emailNewUser = "testBusinessUserEmail@test.com";
    private final String roleNewUser = "business";
    private final String passwordNewUser = "123456789";
    private String idNewUser = "";

    private String idNewShop = "";

    private String idNewService = "";


    private String idNewComment = "";

    @BeforeAll
    public void setUpForTests(MockMvc mockMvc) throws Exception{

        System.out.println("Set Up For Comments Tests");

        Map<String,String> data = new HashMap<>();
        data.put("username",userNameNewUser);
        data.put("email",emailNewUser);
        data.put("role",roleNewUser);
        data.put("password",passwordNewUser);

        this.idNewUser = TestHelper.createTestUser(mockMvc,data);

        Map<String,String> shopData = new HashMap<>();
        shopData.put("shopName", "test new shop name 1");
        shopData.put("contactNumber","123456789");
        shopData.put("startTime","09:00");
        shopData.put("endTime","21:00");
        shopData.put("shopAddress","330 church street, parramatta, sydney, NSW");
        shopData.put("shopDescription","this is test shop 1");
        shopData.put("userId",this.idNewUser);
        shopData.put("lat","-50.0");
        shopData.put("lng","50.0");

        this.idNewShop = TestHelper.createTestShop(mockMvc,shopData);

        Map<String,Object> serviceData = new HashMap<>();
        serviceData.put("available",1);
        serviceData.put("serviceDescription","this is test service description");
        serviceData.put("image",null);
        serviceData.put("pickup",1);
        serviceData.put("price","123");
        serviceData.put("serviceName","This is test service name");
        serviceData.put("shop_id",Integer.parseInt(this.idNewShop));

        this.idNewService = TestHelper.createTestService(mockMvc,serviceData);

        System.out.println("Done Set Up For Comments Tests");
    }


    @Test
    public void testAddComment(MockMvc mockMvc) throws Exception{
        System.out.println("Test Add New Comment");

        Map<String,String> data = new HashMap<>();
        data.put("content","This is a testing comment content");
        data.put("rating","5");
        data.put("userId",this.idNewUser);
        data.put("serviceId",this.idNewService);

        mockMvc.perform(post("/comments/addComment")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        MvcResult resultActions = mockMvc.perform(get("/comments/getCommentsById/"+this.idNewService))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = resultActions.getResponse().getContentAsString();

        final ObjectMapper mapper = new ObjectMapper();

        List<Map<String,Object>> map = mapper.readValue(contentAsString, ArrayList.class);

        this.idNewComment = String.valueOf(map.get(0).get("id"));

        System.out.println("Done Test Add New Comment");
    }

    @Test
    public void testGetCommentsByServiceId(MockMvc mockMvc) throws Exception{
        System.out.println("Test Get Comments By Service Id");

        List<Map<String,Object>> res = TestHelper.getListResponses(mockMvc,"/comments/getCommentsById/"+this.idNewService);

        Assert.assertEquals(res.size(),1);

        Map<String, Object> com = res.get(0);

        Assert.assertEquals(com.get("id"),Integer.parseInt(this.idNewComment));
        Assert.assertEquals(com.get("user_id"),Integer.parseInt(this.idNewUser));
        Assert.assertEquals(com.get("service_id"),Integer.parseInt(this.idNewService));
        Assert.assertEquals(com.get("content"),"This is a testing comment content");
        Assert.assertEquals(com.get("rating"),5);

        System.out.println("Done Test Get Comments By Service Id");
    }

    @AfterAll
    public void cleanUpAfterTests(MockMvc mockMvc) throws Exception{
        System.out.println("Clean Up");

        TestHelper.clearTestUserFromDb(mockMvc,this.idNewUser);
        TestHelper.clearTestShopsFromDb(mockMvc,this.idNewUser);
        TestHelper.clearTestServicesFromDb(mockMvc,this.idNewShop);
        TestHelper.clearTestCommentsFromDb(mockMvc,this.idNewService);

        System.out.println("Done Clean Up");
    }

    @Test
    public void runAll(MockMvc mockMvc) throws Exception{
        setUpForTests(mockMvc);

        try{
            testAddComment(mockMvc);
            testGetCommentsByServiceId(mockMvc);
        }
        catch (Exception e){
            System.out.println(e);
        }

        cleanUpAfterTests(mockMvc);
    }

}
