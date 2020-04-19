# Electro-Node-Back-End
Basic Back-End For electronics Web Page

#BASIC API
 
 Categories
 
 POST /api/category
 
  Description: create a new category
  
  HEADERS
  Content-Type: application/json
  Content-Type: application/x-www-form-urlencoded
  
  BODY
  name:            String   
  description:     String
  dependency:      Boolean      <- Send True or False if this category have a dependency from another category
  dependencyId:    ObjectID     <- Only should have value if dependency is true
  
 GET /api/category/:id?
 
 
  Description: get a category declearing his id, or get all category without decleare some id
  
  HEADERS
  Content-Type: application/json
  
