users = [{
    id: 1,
    name: "Manish",
    mobile: '1234567890',
    password: 'asdf'
}]

const getAllUsers = () => {
    return users
}

const addUser = (name, mobile, password) => {
    id = users.length + 1
    user = {
        id: id,
        name: name,
        mobile: mobile,
        password: password
    }
    users.push(user)
    return id
}

module.exports = {
    getAllUsers,
    addUser
}