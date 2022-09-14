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

const getUsersOtherThan = (username) => {
    allUsers = users.filter(item => item.name !== username)
    return allUsers
}

const changeUserInfo = (oldUsername, newUsername, mobile, email) => {
    const oldUser = users.filter(item => item.name === oldUsername)
    const idx = users.findIndex(i => i.name == oldUsername)
    const newUser = {
        id: oldUser[0].id,
        name: newUsername,
        mobile: mobile,
        email: email,
        password: oldUser[0].password
    }
    users.splice(idx, 1)
    users.push(newUser)
}

const changePassword = (username, newPassword) => {
    const oldUser = users.filter(item => item.name === username)
    const idx = users.findIndex(i => i.name == username)
    const newUser = {
        id: oldUser[0].id,
        name: oldUser[0].name,
        mobile: oldUser[0].mobile,
        email: oldUser[0].email,
        password: newPassword
    }
    users.splice(idx, 1)
    users.push(newUser)
    console.log(users)
}

module.exports = {
    getAllUsers,
    addUser,
    getUserByUsername,
    getUsersOtherThan,
    changeUserInfo,
    changePassword
}