# MERN-Support-Desk

### Env Variables

Create a .env file in root and add the following:

```
DATABASE_URI = your mongo db uri
NODE_ENV = development
PORT = 5000
JWT_SECRET = super_sercret_key_123
JWT_LIFETIME = 7d
```

### Install Dependencies (root & frontend)

```
npm install
cd frontend and run npm install
```

### Run

```
# Run backend (:5000)
position in root and than run next command: 
npm run server

# Run frontend (:3000)
cd frontend and than run next command: npm start

# Run both backend & frontend:
position in root and run:
npm run dev
```

### Seed Database

You can use the following commands to seed the database with some sample users, tickets and notes as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

email: john@gmail.com
password: 123456

email: kristijan@gmail.com
password: 123456

email: jane@gmail.com
password: 123456
```

