# COMP5619_ShiningCoat

## Installing

Open terminal in root directory of the project. Run the following command.

```bash
./run.sh
```

## Running backend
Open terminal in root directory of the project. Run the following command.

```bash
cd backend/
./gradlew bootRun 
```

## Running frontend
Open terminal in root directory of the project. Run the following command.

```bash
cd frontend/
npm start 
```

## Running Tests
Open terminal in root directory of the project. Run the following command.

```bash
cd backend/
./gradlew test
```


## All working functionalities

* Sign In/Up/Out

* Search
  * Search By Service Name
  * Search By Shop Name
  
* Recommendation For Users
  * Recommendation on the best rating services before user login / login as customer
  * Personalized recommendation based on user's liked services and booking records
  
* Make a booking

* View & manage all bookings made
  * For customer: able to cancel incoming bookings and leave comments to past boookings if it is still avialable
  * For business: able to cancel incoming bookings
  
* View service detail page

* Display shop address on the map

* Leave comments & ratings to a service

* View comments & ratings of a service

* Like a service

* View all liked service

* View shop detail page

* View & manage user profile

* Business management page
  * View all shops
  * Manage shop
  * Upload new shop
  * View all services
  * Manage service
  * Upload new service

## Used Libraries for Frontend
* npm: 8.17.0
* "@ant-design/icons": "^4.7.0",
* "@testing-library/jest-dom": "^5.16.5",
* "@testing-library/react": "^13.3.0",
* "@testing-library/user-event": "^13.5.0",
* "antd": "^4.22.8",
* "axios": "^0.27.2",
* "crypto-js": "^4.1.1",
* "gapi-script": "^1.2.0",
* "google-maps-react": "^2.0.6",
* "react": "^18.2.0",
* "react-cookie": "^4.1.1",
* "react-cookies": "^0.1.1",
* "react-dom": "^18.2.0",
* "react-google-autocomplete": "^2.7.0",
* "react-google-login": "^5.2.2",
* "react-router-dom": "^6.3.0",
* "react-scripts": "5.0.1",
* "web-vitals": "^2.1.4"

## Used Libraries for Backend
* Java: No lower than Java 1.8
* 'org.springframework.boot' version '2.7.3'
* 'io.spring.dependency-management' version '1.0.13.RELEASE'
* 'org.springframework.boot:spring-boot-starter-data-jpa'
* 'org.springframework.boot:spring-boot-starter-web'
* 'mysql:mysql-connector-java'
* 'org.springframework.boot:spring-boot-starter-test'
* 'junit:junit:4.13'
* 'com.google.api-client:google-api-client:1.32.1'

## Notice
We provide both remote/local MySQL server for the backend. Due to the upload bandwith limitation, using remote MySQL is very slow. Therefore, local MySQL server is used by default.

To switch between remote/local MySQL server, open the file
```backend/src/main/resources/application.properties```, comment/uncomment the content below ```Remote MySQL Settings``` or ```Local MySQL Settings```
