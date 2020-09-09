// const bodyParser = require('body-parser')
const update = document.querySelector('#update-button')

update.addEventListener('click', function () {
  console.log("doing fetch request")
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "name": "Darth Vader",
      "quote": "I find your lack of faith disturbing."
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    console.log("I need a reload")
    window.location.reload(true)
  })
})

const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {
  console.log('delete button clicked')
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader'
    })
  })
    .then(response => {
      if (response === 'No quote to delete') {
        messageDiv.textContent = 'No Darth Vadar quote to delete'
      } else {
        console.log('deleting!')
        window.location.reload(true)
      }
    })
    .catch(error => console.error(error))
   })
