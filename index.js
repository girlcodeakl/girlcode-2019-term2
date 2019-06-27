//set up
let express = require('express')
let app = express();
let bodyParser = require('body-parser')

//If a client asks for a file,
//look in the public folder. If it's there, give it to them.
app.use(express.static(__dirname + '/public'));

//this lets us read POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//make an empty list
let posts = [];

//find post


//let a client GET the list
function sendPostsList(request, response) {
  response.send(posts);
}
app.get('/posts', sendPostsList);

//let a client POST something new
function saveNewPost(request, response) {
  console.log(request.body.message); //write it on the command prompt so we can see
  let post= {};
  post.message = request.body.message;
  post.image = request.body.image;
  post.id = Math.round(Math.random() * 10000);
posts.push(post); //save it in our list
  response.send("thanks for your message. Press back to add another");
}
app.post('/posts', saveNewPost);

app.get('/post', function (request, response) {
  let searchId = request.query.id;
  console.log("Searching for post " + searchId);
  let post = posts.find(x => x.id == searchId);
  response.send(post);
});


//listen for connections on port 3000
app.listen(process.env.PORT || 3000);
console.log("Hi! I am listening at http://localhost:3000");
