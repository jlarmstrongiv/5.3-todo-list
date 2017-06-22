;(function () {
  console.log('loaded main js');

  let addTodoButton = document.getElementById('add-form__button');
  let addTodoInput = document.getElementById('add-form__input');
  console.log(addTodoInput.value);
  addTodoButton.addEventListener('click', sendAddTodo, false);

  function sendAddTodo () {
    let text = addTodoInput.value;
    let url = '/todo/' + 'new' + '/status/' + 'new' + '/text/' + text;
    let formsBody = 'FormData() won\'t work';
    let pageRefresh = true;
    postFetch(url, formsBody, pageRefresh);
  }


  var classname = document.getElementsByClassName("classCheckbox");
  for (let i = 0; i < classname.length; i++) {
    classname[i].addEventListener('change', sendForm, false);
  }

  function sendForm () {
    console.log('start');
    let complete = false;
    if (this.checked) {
      complete = true;
    }
    let text = this.getAttribute('data-text');
    let url = '/todo/' + this.id + '/status/' + complete + '/text/' + text;
    let formsBody = 'FormData() won\'t work';
    let pageRefresh = false;
    postFetch(url, formsBody, pageRefresh);
    // let todoItem = {
    //   "id": this.id,
    //   "name": this.name,
    //   "complete": this.checked
    // };
    // console.log(todoItem);
    // for (let key in todoItem) {
    //   formsBody.append(key, todoItem[key]);
    //   console.log('should work');
    // }
  }
  function postFetch (url, formsBody, pageRefresh) {
    console.log(pageRefresh);
    fetch(url, {
      method: 'post',
      body: formsBody,
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(function (response) {
      console.log(pageRefresh);
      console.log('end');
      if (pageRefresh) {
        setTimeout(function () {
          window.location = '/';
        }, 300);
      }
    });
  }

}());
