# Basic User System API's

## Routes

* POST: **/register**   *[params = name, email, mobile, password]*
  
  > Takes data in json format and returns a jwt token. Password is stored in hashed form
  
* POST: **/login**    *[params = name, password]*

  > Takes login info in json format and returns jwt token
  
* GET: **/info/own/:username**    *[params = username]*

  > returns json object with information if that user exits
  
* GET: **/info/other/:username**    *[params = username]*
  
  > returns json object with information other than the username given
  
* POST: **/change/userinfo**    *[params = oldUsername, newUsername, email, mobile]*
 
    >  changes user info, takes input in json format
 
* POST: **/change/password**    *[params = username, newPassword]*
  
    > validates if user exits, if user does exit, changes password
 
 *  All routes except `/login` and `/register` require bearer token
 * `/login` and `/register` return a jwt token valid for limited period of time

