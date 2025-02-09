const { DynamoDBClient, ScanCommand, PutItemCommand, DeleteItemCommand, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");


const client = new DynamoDBClient({ region: "us-east-2" });
const snsClient = new SNSClient({ region: "us-east-2" });

const getUsers = async () => {
  console.log("Ejecutando getUsers...");

  try {
    console.log("Table Name:", process.env.DYNAMODB_TABLE);

    const command = new ScanCommand({ TableName: process.env.DYNAMODB_TABLE });
    const response = await client.send(command);

    console.log("Datos obtenidos:", response.Items);

    return {
      statusCode: 200,
      body: JSON.stringify(response.Items),
    };
  } catch (error) {
    console.error("Error en getUsers:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al obtener usuarios" }),
    };
  }
};

const createUser = async (event) => {
  try {
    console.log("Ejecutando createUser...");

    const { id, nombre, cedula } = JSON.parse(event.body);

    const command = new PutItemCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: { S: id },
        nombre: { S: nombre },
        cedula: { N: cedula.toString() } // Asegurar que cedula sea string
      }
    });

    await client.send(command);

    return { statusCode: 201, body: JSON.stringify({ message: "Usuario creado" }) };
  } catch (error) {
    console.error("Error en createUser:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al crear usuario" }),
    };
  }
};

/**
 * Actualizar un usuario
 */
const updateUser = async (event) => {

  try {
    console.log("Ejecutando updateUser...");

    const { id, nombre, cedula } = JSON.parse(event.body);

    const command = new UpdateItemCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id: { S: id } },
      UpdateExpression: "SET nombre = :nombre, cedula = :cedula",
      ExpressionAttributeValues: {
        ":nombre": { S: nombre },
        ":cedula": { N: cedula.toString() }
      }
    });

    await client.send(command);

    return { statusCode: 200, body: JSON.stringify({ message: "Usuario actualizado" }) };
  } catch (error) {
    console.error("Error en updateUser:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al actualizar usuario" }),
    };
  }
};

/**
 * Eliminar un usuario
 */
const deleteUser = async (event) => {
  const { id } = event.pathParameters;

  const command = new DeleteItemCommand({
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: { S: id },
    },
  });

  try {
    await client.send(command);
    return { statusCode: 200, body: JSON.stringify({ message: 'Usuario eliminado' }) };
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Error al eliminar el usuario' }) };
  }
};


const sendEmail = async (event) => {
  try {
    const { email, subject, message } = JSON.parse(event.body);

    if (!email || !subject || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: "Faltan parámetros" }) };
    }

    const params = {
      Message: message,
      Subject: subject,
      TopicArn: process.env.SNS_TOPIC_ARN, // Usa un Topic en vez de un email directo
    };

    const response = await snsClient.send(new PublishCommand(params));

    return { statusCode: 200, body: JSON.stringify({ message: "Correo enviado", response }) };
  } catch (err) {
    console.error("Error al enviar correo:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "No se pudo enviar el correo", err }) };
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, sendEmail };

