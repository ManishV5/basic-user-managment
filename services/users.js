users = [{
    id: 1,
    name: "Manish",
    mobile: '1234567890',
    password: 'asdf',
    email: 'manish@mail'
},
{
    id: 2,
    name: "Random",
    mobile: '1234567890',
    password: 'asdf',
    email: 'random@random'
}
]

const getAllUsers = () => {
    return users
}

const addUser = (name, mobile, password, email) => {
    id = users.length + 1
    user = {
        id: id,
        name: name,
        mobile: mobile,
        password: password,
        email: email
    }
    users.push(user)
    return id
}

const getUserByUsername = (username) => {
    user = users.filter((item) => item.name === username)
    return user
}

module.exports = {
    getAllUsers,
    addUser,
    getUserByUsername
}