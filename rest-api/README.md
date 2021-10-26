node app.js

SET NO_PROXY=localhost,127.0.0.1

curl -s -X GET http://localhost:8888/users
curl -s -X POST -H "Content-Type: application/json" -d "{\"id\":4,\"name\":\"Sasaki\",\"email\":\"sasaki@example.com\"}" http://127.0.0.1:8888/users
curl -s -X POST -H "Content-Type: application/json" -d "{\"id\":4,\"name\":\"Sasaki2\",\"email\":\"sasaki2@example.com\"}" http://127.0.0.1:8888/users/4
curl -s -X DELETE http://127.0.0.1:8888/users/4