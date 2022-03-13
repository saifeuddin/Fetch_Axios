                                  // Axios Globals
  axios.defaults.headers.common["X-Auth-Token"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";






                                  // GET REQUEST
function getTodos() {
  console.log('GET Request')

    // axios({
    //   method: 'get',
    //   url: 'https://jsonplaceholder.typicode.com/todos',
    //   params: {
    //     _limit: 2
    //   }
    // })



// Another way
    // axios('https://jsonplaceholder.typicode.com/todos', {
    //   params: {
    //     _limit: 2
    //   }
    // })


// Another way Shorter
    // axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=1`)



// Another way get is by default
    axios(`https://jsonplaceholder.typicode.com/todos?_limit=1`)

// Setting Timeout
    // axios(`https://jsonplaceholder.typicode.com/todos?_limit=1`, { timeout:  500 })
    .then(res => showOutput(res))
    .catch(e => console.log(e))
}










                                      // POST REQUEST
function addTodo() {
  console.log('POST Request')


    // axios({
    //   method: 'post',
    //   url: 'https://jsonplaceholder.typicode.com/todos',
    //   data: {
    //     title: 'New todo',
    //     completed: false
    //   }
    // })


// Another way
    axios.post('https://jsonplaceholder.typicode.com/todos',
      {
        title: 'New todo',
        completed: false
      }
    )
    .then(res => showOutput(res))
    .catch(e => console.log(e))
}







                            // PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request')


// Put Method
    // axios({
    //   method: 'put',
    //   url: 'https://jsonplaceholder.typicode.com/todos/1',
    //   data: {
    //     title: 'New todo',
    //     completed: false
    //   }
    // })


// Anothe Way
    // axios.put('https://jsonplaceholder.typicode.com/todos/1',{
    //     title: 'New todo',
    //     completed: false
    // })
    // .then(res => showOutput(res))
    // .catch(e => console.log(e))





// Patch Method
    axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
        title: 'New todo',
        completed: false
    })
    .then(res => showOutput(res))
    .catch(e => console.log(e))
}






                                  // DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request')


    axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(e => console.log(e))

}







                                // SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request')

    // axios
    //   .all([
    //     axios.get('https://jsonplaceholder.typicode.com/todos/1'),
    //     axios.get('https://jsonplaceholder.typicode.com/posts/1')
    //   ])

    //   .then(res => {
    //     console.log(res[0])
    //     console.log(res[1])
    //     showOutput(res[1])
    //   })





// With axios spred
    axios
      .all([
        axios.get('https://jsonplaceholder.typicode.com/todos/1'),
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
      ])

      .then(axios.spread((todos, posts) => {
        console.log(todos, posts)
        showOutput(todos)
        // showOutput(posts)
      }))

    .catch(e => console.log(e))
}









                                // CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers')

    const config = {
      headers: {
        'Content-Type' : 'application/json',
        Authorization: 'sometoken'
      }
    }

    axios
      .post('https://jsonplaceholder.typicode.com/todos',{
        title: 'New todo',
        completed: false
      }, config)
      .then(res => showOutput(res))
      .catch(e => console.log(e))
}





                  // TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response')

    const options = {
      method: 'post',
      url:'https://jsonplaceholder.typicode.com/todos',
      data: {
        title : 'Hello world,'
      },
      transformResponse : axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase()
        return data
      })
    }

    axios(options).then(res => showOutput(res))
}





                            // ERROR HANDLING
function errorHandling() {
  console.log('Error Handling')

  axios(`https://jsonplaceholder.typicode.com/todo`, {
    validateStatus: function() {
      return status > 500  // Reject over 500 or equal 500
    }
  })
    .then(res => showOutput(res))
    .catch(e => {
      if(e.response) {
        console.log(e.response.status)

        if(e.response.status === 404) {
          alert('Page Not Found')
        }
      } else if(e.request) {
        // Request was made but no response
        console.log(e.request)
      } else {
        console.log(e.message)
      }
    })
}





                          // CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token')

  const source = axios.CancelToken.source()

    axios(`https://jsonplaceholder.typicode.com/todos?_limit=1`, {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if(axios.isCancel(thrown)) {
        console.log('Request is cancel', thrown.message)
      }
    })

    if(true) {
      source.cancel('request is canceled')
    }

}






                    // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(config => {
      console.log(`${config.method.toUpperCase()} req to ${config.url} at ${new Date().toLocaleTimeString()}`)

      return config
  }, error => {
    return Promise.reject(error)
  })









                          // AXIOS INSTANCES
// const instance = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com'
// })

// instance.get("/comments?_limit=2")
// .then(res => showOutput(res))







// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`
}




              // Event listeners
document.getElementById('get').addEventListener('click', getTodos)
document.getElementById('post').addEventListener('click', addTodo)
document.getElementById('update').addEventListener('click', updateTodo)
document.getElementById('delete').addEventListener('click', removeTodo)
document.getElementById('sim').addEventListener('click', getData)
document.getElementById('headers').addEventListener('click', customHeaders)
document.getElementById('transform').addEventListener('click', transformResponse)
document.getElementById('error').addEventListener('click', errorHandling)
document.getElementById('cancel').addEventListener('click', cancelToken)
