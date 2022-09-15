# Basic User System API's

## Routes

POST: /register [params = name, email, mobile, password]
POST: /login [params = name, password]
GET: /info/own/:username [params = username]
GET: /info/other/:username [params = username]
POST: /change/userinfo [params = oldUsername, newUsername, email, mobile]
POST: /change/password [params = username, newPassword]

