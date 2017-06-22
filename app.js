const express = require('express')
  , path = require('path')
  , mustacheExpress = require('mustache-express')
  , bodyParser = require('body-parser')
  , expressValidator = require('express-validator')
  , jsonfile = require('jsonfile');

const todosFile = './todosData.json'
  , todosObj = 'text';

const app = express();

app.use('/views', express.static(path.join(__dirname, 'views')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');



let context = jsonfile.readFileSync(todosFile);

app.get('/', function (req, res) {
  return res.render('index', context);
});

app.post('/todo/:todoId/status/:status/text/:text', function (req, res) {
  console.log('successful post');
  // console.log(req.body);
  // console.log(req.body.id);
  let todoId = req.params.todoId;
  let todoText = req.params.text;
  let todoStatus = req.params.status;
  let isTrueStatus = (req.params.status === 'true');
  function isTodoId (value) {
    return Number(value.id) === Number(todoId);
  }
  let todo = context.todos.filter(isTodoId);

  if (todo[0]) {
    todo[0].complete = isTrueStatus;
    let addNewBool = true;
    for (var i = 0; i < context.todos.length; i++) {
      if (context.todos[i].id === todo[0].id) {
        console.log('update');
        context.todos[i].id = todo[0].id;
        addNewBool = false;
      }
    }
  } else {
    console.log('add');
    console.log(todoText);
    context.todos.push({
      "id": (context.todos.length),
      "text": todoText,
      "complete": false});
  }
  jsonfile.writeFileSync(todosFile, context, {spaces: 2});
  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('Express is listening for connections');
});
