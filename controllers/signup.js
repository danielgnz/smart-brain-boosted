const saltRounds = 10

const handleSignUp = (db, bcrypt) => (req, res) => {
    const { userName, email, password } = req.body

    bcrypt.hash(password, saltRounds)
    .then(hash => {
        return db.transaction(trx => {
            return trx
                .insert({
                    hash, 
                    email,
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx
                        .insert({
                          user_name: userName,
                          email: loginEmail[0],
                          joined: new Date()
                        })
                        .into('users')
                        .returning('*')
                        .then(user => res.status(200).send(user[0]))
                        .catch(error => res.status(400).send('couldnt insert user'))
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(error => res.status(400).send('transaction error'))
    })
    .catch(error => res.status(400).send('bcrypt error'))
}

module.exports = {
    handleSignUp
}