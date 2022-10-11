# COMP5619_ShiningCoat

### Installing

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
