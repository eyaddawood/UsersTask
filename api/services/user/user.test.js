const databaseInstance = require("../../utils/db/models/db_instance");
const handleApiError = require("../../utils/middlewares/ErrorHandler");
const jwt = require("jsonwebtoken");
const userController = require("./user.controller");

// Helper function for login
const login = async (body) => {
  const user = await databaseInstance.db.User.findOne({ where: { Email: body.Email } });
  if (!user) {
    return {
      status: 401,
      body: { message: "Email is incorrect" },
    };
  }

  const token = jwt.sign({ user: user.toJSON() }, process.env.HASHKEY, { expiresIn: '7d' });

  return {
    status: 200,
    body: { userInfo: user, token: token },
  };
};



// Test Login API
test('Login API - Successful Login', async () => {
  const body = { Email: 'eyad@eyad.com' };
  const res = await login(body);

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('userInfo');
  expect(res.body).toHaveProperty('token');
});

test('Login API - Incorrect Email', async () => {
  const body = { Email: 'nonexistent@eyad.com' }; 
  const res = await login(body);

  expect(res.status).toBe(401);
  expect(res.body).toHaveProperty('message', 'Email is incorrect');
});



// Test getAllUsers API
test('getAllUsers API - Return an array of users', async () => {
  jest.spyOn(databaseInstance.db.User, 'findAll').mockResolvedValue([{ id: 1, name: 'eyad' }]);

  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  }; 

  await userController.getAllUsers(req, res);

  expect(res.status).toBeCalledWith(200);
  expect(res.send).toBeCalledWith([{ id: 1, name: 'eyad' }]);

  databaseInstance.db.User.findAll.mockRestore();
});



// Test getUserById API - User found
test('getUserById API - Return a user by ID', async () => {
 
  jest.spyOn(databaseInstance.db.User, 'findAll').mockResolvedValue([{ id: 1, name: 'John Doe' }]);

  const req = { params: { id: 1 } };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  await userController.getUserById(req, res);

  expect(res.status).toBeCalledWith(200);
  expect(res.send).toBeCalledWith([{ id: 1, name: 'John Doe' }]);

  databaseInstance.db.User.findAll.mockRestore();
});

// Test getUserById API - User not found
test('getUserById API - User not found', async () => {
  jest.spyOn(databaseInstance.db.User, 'findOne').mockResolvedValue([]);

  const req = { params: { id: 1 } };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  await userController.getUserById(req, res);

  expect(res.status).toBeCalledWith(404);
  expect(res.send).toBeCalledWith({ message: 'User not found' });

  databaseInstance.db.User.findOne.mockRestore();
});

// Test getUserById API - Invalid ID
test('getUserById API - Invalid ID', async () => {
  const req = { params: { id: null } };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  await userController.getUserById(req, res);

  expect(res.status).toBeCalledWith(400);
  expect(res.send).toBeCalledWith({ message: 'Id is required' });
});




// Test createUser API - User created successfully
test('createUser API - User created successfully', async () => {
  const req = {
    body: {
      Email: "eyad3@eyad3.com",
    Name: "eyad3",
    Mobile: "12345678",
    Country: "USA",
    Age: 30
  
  
  },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.spyOn(databaseInstance.db.User, 'create').mockResolvedValue({  Email: "eyad3@eyad3.com",
  Name: "eyad3",
  Mobile: "12345678",
  Country: "USA",
  Age: 30
 });

  await userController.createUser(req, res);

  expect(res.status).toBeCalledWith(200);
  expect(res.json).toBeCalledWith({ message: 'User created successfully' });

  databaseInstance.db.User.create.mockRestore();
});



// Test editUser API - Successful user edit
test('editUser API - Successful user edit', async () => {
  const req = {
    body: {
      id: 1, 
      Age: 30,
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.spyOn(databaseInstance.db.User, 'update').mockResolvedValue([1]); 

  await userController.editUser(req, res);

  expect(res.status).toBeCalledWith(200);
  expect(res.json).toBeCalledWith({ message: 'User edited successfully' });

  databaseInstance.db.User.update.mockRestore();

  await new Promise(resolve => setTimeout(resolve, 100)); 
});


// Test deleteUser API - Successful user deletion
test('deleteUser API - Successful user deletion', async () => {
  const req = {
    params: {
      id: 1, 
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.spyOn(databaseInstance.db.User, 'destroy').mockResolvedValue(1); 

  await userController.deleteUser(req, res);

  expect(res.status).toBeCalledWith(200);
  expect(res.json).toBeCalledWith({ message: 'User deleted successfully' });

  databaseInstance.db.User.destroy.mockRestore();

  await new Promise(resolve => setTimeout(resolve, 100)); 
});


