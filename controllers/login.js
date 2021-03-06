const handleLogin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body

    db('users')
    .where({ email })
    .select('*')
    .then(user => {
        if(!user.length) {
            return res.status(400).send('no user')
        }
        else {
            db('login')
            .where({ email })
            .select('hash')
            .then(data => {
                const { hash } = data[0]
                bcrypt.compare(password, hash)
                .then(areEqual => {
                    return areEqual 
                    ? res.status(200).send(user[0])
                    : res.status(400).send('passwords dont match')
                })
                .catch(error => res.status(400).send('bcrypt error'))
            })
        }
    })
    .catch(error => res.status(400).send('couldnt get user'))
}

module.exports = {
    handleLogin
}