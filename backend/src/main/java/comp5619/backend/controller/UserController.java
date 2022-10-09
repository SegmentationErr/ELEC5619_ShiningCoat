package comp5619.backend.controller;

import comp5619.backend.models.User;
import comp5619.backend.repository.UserRepository;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/users")
public class UserController {
    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private UserRepository userRepository;

    @GetMapping(path = "/profile/{id}")
    public @ResponseBody ResponseEntity<Map<String, Object>> getAllUsers(@PathVariable(name = "id") String id) {
        Map<String, Object> result = userRepository.getUserProfileById(id);
        if (result.size() == 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(result);
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping(path = "/update")
    public @ResponseBody ResponseEntity<Object> updataUserProfile(@RequestBody Map<String, String> params) {
        Map<String, Object> result = userRepository.checkUserPasswordById(params.get("id"),
                params.get("currPassword"));
        if (result.size() == 0) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect Password");
        }

        userRepository.updateUserProfileById(params.get("id"),
                params.get("username"),
                params.get("email"),
                params.get("newPassword"));

        return ResponseEntity.status(HttpStatus.OK).body("Update Success");
    }

    @PostMapping(path = "/add")
    public @ResponseBody ResponseEntity<Map<String, Object>> addUser(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String email = params.get("email");
        String password = params.get("password");
        String role = params.get("role");

        Map<String, Object> response = new HashMap<>();

        if (userRepository.getUserByNameOrEmail(username, email).size() != 0) {
            response.put("Message", "User Exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(password);
        newUser.setRole(role);

        userRepository.save(newUser);
        response.put("Message", "Create User Success");
        response.put("id", String.valueOf(newUser.getId()));
        response.put("role", String.valueOf(newUser.getRole()));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping(path = "/googleSignIn")
    public @ResponseBody ResponseEntity<Map<String, Object>> googleSignIn(@RequestBody Map<String, String> params) {
        String tokenId = params.get("tokenId");
        System.out.println(tokenId);
        
        GoogleIdTokenVerifier verifier =
            new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
            .setAudience(Collections.singletonList("594879814425-h18tqekm4p3vbujs85b4344mduajoi8g.apps.googleusercontent.com"))
            .build();

        // (Receive idTokenString by HTTPS POST)

        // GoogleIdToken idToken;
        try {
            GoogleIdToken idToken = verifier.verify(tokenId);
            if (idToken != null) {
            Payload payload = idToken.getPayload();
    
            // Print user identifier
            String userId = payload.getSubject();
            System.out.println("User ID: " + userId);
    
            // Get profile information from payload
            String email = payload.getEmail();
            // boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
            // String name = (String) payload.get("name");
            // String pictureUrl = (String) payload.get("picture");
            // String locale = (String) payload.get("locale");
            // String familyName = (String) payload.get("family_name");
            // String givenName = (String) payload.get("given_name");
            System.out.println(email);
            // Use or store profile information
            // ...
    
            } else {
            System.out.println("Invalid ID token.");
            }
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


        Map<String, Object> response = new HashMap<>();

        // if (userRepository.getUserByNameOrEmail(username, email).size() != 0) {
        //     response.put("Message", "User Exists");
        //     return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        // }

        // User newUser = new User();
        // newUser.setUsername(username);
        // newUser.setEmail(email);
        // newUser.setPassword(password);
        // newUser.setRole(role);

        // userRepository.save(newUser);
        // response.put("Message", "Create User Success");
        // response.put("id", String.valueOf(newUser.getId()));
        // response.put("role", String.valueOf(newUser.getRole()));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping(path = "/checkSignIn")
    public @ResponseBody ResponseEntity<Map<String, Object>> checkEmailandPassword(
            @RequestBody Map<String, String> params) {
        String email = params.get("email");
        String password = params.get("password");

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> currentUser = userRepository.getUserByEmailandPassword(email, password);
        if (currentUser.size() == 0) {
            response.put("Message", "Wrong Email or Password.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        response.put("Message", "Sign In Success");
        response.put("id", String.valueOf(currentUser.get("id")));
        response.put("role", String.valueOf(currentUser.get("role")));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // test only
    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> testGetAllUser() {
        return userRepository.findAll();
    }

    //This is a test only function, only used to wipe out the users created during the test session.
    @PostMapping(path = "/deleteUser")
    public @ResponseBody ResponseEntity<Object> deleteUserById(@RequestBody Map<String, String> params) {

        String id = params.get("id");

        Map<String,Object> result = userRepository.getUserProfileById(id);

        if (result.size() == 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
        }

        userRepository.deleteUser(id);

        return ResponseEntity.status(HttpStatus.OK).body("Delete User "+id+" Success");
    }
}