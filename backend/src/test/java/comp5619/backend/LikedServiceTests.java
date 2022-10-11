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
public class LikedServiceTests {

    private String userNameNewUser = "Business Users Used For Test";
    private String emailNewUser = "testBusinessUserEmail@test.com";
    private final String roleNewUser = "business";
    private final String passwordNewUser = "123456789";
    private String idNewUser = "";

    private String idNewShop = "";

    private String idNewService = "";


    private String userNameNewCustomerUser = "Users Used For Test";
    private String emailNewCustomerUser = "testUserEmail@test.com";
    private final String roleNewCustomerUser = "customer";
    private final String passwordNewCustomerUser = "123456789";

    private String idNewCustomerUser = "";


    @BeforeAll
    public void setUpForTests(MockMvc mockMvc) throws Exception{

        System.out.println("Set Up For Liked Services Tests");

        //set up business user
        Map<String,String> data = new HashMap<>();
        data.put("username",userNameNewUser);
        data.put("email",emailNewUser);
        data.put("role",roleNewUser);
        data.put("password",passwordNewUser);

        this.idNewUser = TestHelper.createTestUser(mockMvc,data);

        //set up new shop
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

        //set up new service
        Map<String,Object> serviceData = new HashMap<>();
        serviceData.put("available",1);
        serviceData.put("serviceDescription","this is test service description");
        serviceData.put("image",null);
        serviceData.put("pickup",1);
        serviceData.put("price","123");
        serviceData.put("serviceName","This is test service name");
        serviceData.put("shop_id",Integer.parseInt(this.idNewShop));

        this.idNewService = TestHelper.createTestService(mockMvc,serviceData);

        //set up new test customer
        Map<String,String> customerData = new HashMap<>();
        customerData.put("username",userNameNewCustomerUser);
        customerData.put("email",emailNewCustomerUser);
        customerData.put("role",roleNewCustomerUser);
        customerData.put("password",passwordNewCustomerUser);

        this.idNewCustomerUser = TestHelper.createTestUser(mockMvc,customerData);

        System.out.println("Done Set Up For Liked Services Tests");
    }

    @Test
    public void testLikeService(MockMvc mockMvc) throws Exception{
        System.out.println("Test Like A Service");

        Map<String,Object> data = new HashMap<>();
        data.put("user_id",this.idNewCustomerUser);
        data.put("service_id",this.idNewService);

        mockMvc.perform(post("/likedServices/likeOrUnlike")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        System.out.println("Done Test Like A Service");
    }


    @Test
    public void testUnLikeService(MockMvc mockMvc) throws Exception{
        System.out.println("Test Unlike A Service");

        Map<String,Object> data = new HashMap<>();
        data.put("user_id",this.idNewCustomerUser);
        data.put("service_id",this.idNewService);


        mockMvc.perform(post("/likedServices/likeOrUnlike")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Unlike Service Success")));

        System.out.println("Done Test Unlike A Service");
    }


    @Test
    public void testGetLikedServiceById(MockMvc mockMvc) throws Exception{
        System.out.println("Test Get Liked Service By User Id");

        List<Map<String,Object>> res = TestHelper.getListResponses(mockMvc,"/likedServices/getLikedServicesById/"+this.idNewCustomerUser);

        Assert.assertEquals(res.size(),1);

        Assert.assertEquals(res.get(0).get("service_name"),"This is test service name");

        Assert.assertEquals(res.get(0).get("service_id"),Integer.parseInt(this.idNewService));

        System.out.println("Done Test Get Liked Service By User Id");
    }

    @AfterAll
    public void cleanUpAfterTests(MockMvc mockMvc) throws Exception{
        TestHelper.clearTestUserFromDb(mockMvc,this.idNewUser);
        TestHelper.clearTestShopsFromDb(mockMvc,this.idNewUser);
        TestHelper.clearTestServicesFromDb(mockMvc,this.idNewShop);
        TestHelper.clearTestUserFromDb(mockMvc,this.idNewCustomerUser);
        TestHelper.clearTestLikedServiceFromDb(mockMvc,this.idNewCustomerUser);
    }


    @Test
    public void runAll(MockMvc mockMvc) throws Exception{
        setUpForTests(mockMvc);

        try{
            testLikeService(mockMvc);
            testGetLikedServiceById(mockMvc);
            testUnLikeService(mockMvc);
        }
        catch (Exception e){
            System.out.println(e);
        }

        cleanUpAfterTests(mockMvc);
    }


}
