"use strict";

const users = [
  { id: 1, name: "Juan", email: "juan@example.com" },
  { id: 2, name: "María", email: "maria@example.com" },
  { id: 3, name: "Carlos", email: "carlos@example.com" }
];

module.exports.getUsers = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};

module.exports.createUser = async (event) => {
  const newUser = JSON.parse(event.body);
  newUser.id = users.length + 1;
  users.push(newUser);

  return {
    statusCode: 201,
    body: JSON.stringify(newUser),
  };
};

module.exports.updateUser = async (event) => {
  const { id } = event.pathParameters;
  const updatedData = JSON.parse(event.body);
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Usuario no encontrado" }),
    };
  }

  users[userIndex] = { ...users[userIndex], ...updatedData };

  return {
    statusCode: 200,
    body: JSON.stringify(users[userIndex]),
  };
};

module.exports.deleteUser = async (event) => {
  const { id } = event.pathParameters;
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Usuario no encontrado" }),
    };
  }

  users.splice(userIndex, 1);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Usuario eliminado correctamente" }),
  };
};
