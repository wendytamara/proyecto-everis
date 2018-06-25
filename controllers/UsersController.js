const mongoose = require('mongoose') 
const User  = mongoose.model('User')

//GET - Return all users in the DB
exports.findAllUsers = (req, res) => {
	console.log('GET /users')

  User.find((err, users) => {
	  if (err) return res.send(500, err.message)

	  res.status(200).jsonp(users)

  })

}

//GET - Return a User with specific ID
exports.findById = (req, res) => {
	const id = req.params.id
	console.log(`GET /users/${id}`)

	User.findById(id, (err, user) => {
		if (err) return res.send(500, err.message)

		res.status(200).jsonp(user)
	})

}

//POST - Insert a new User in the DB
exports.addUser = (req, res) => {
    console.log('POST /users')
    console.log(req.body)

    var user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        gender: req.body.gender,
    })

    user.save((err, user) => {
    
    if (err) return res.status(500).send( err.message)
    
    res.status(200).jsonp(user)
    })
}

//PUT - Update a register already exists
exports.updateUser = (req, res) => {
    const id = req.params.id
    console.log(`PUT /users/${id}`)

    User.findById(id, (err, user) => {
    		if (!user) return res.status(404).send({message: 'User not exist'})

        user.name = req.body.name
        user.lastname = req.body.lastname
        user.username = req.body.username
        user.email = req.body.email
        user.gender = req.body.gender

        user.save((err) => {
        	if (err) return res.status(500).send(err.message)
      		
      		res.status(200).jsonp(user)

        })

    })
}

//DELETE - Delete a User with specified ID
exports.deleteUser = (req, res) => {
    const id = req.params.id
    console.log(`DELETE /users/${id}`)

    User.findById(id, (err, user) => {

    		if (!user) return res.status(404).send({message: 'User not exist'})

        user.remove( (err) => {
        	if (err) return res.status(500).send(err.message)
      		
      		res.status(200).jsonp({message: 'User deleted'})
        })
    })
}
