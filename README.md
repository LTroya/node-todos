# Nodejs Todo App

This is todo app using node js in order to learn about testing
and authentication.

### Steps to run
- Create `server/config/config.json` file
- Set the following keys:
  - **MLAB_URI**: This can be a local mongodb url
  - **JWT_SECRET**: Some random secret to generate the salt for the token
  - **PORT**: Port of the app you want to use
- Set up that keys for `test` and `development`
- Run `yarn install` or `npm install`

`Config.json` example:

```

{
  "test": {
    "PORT": "YOUR_PORT_HERE",
    "MLAB_URI": "YOUR_MONGODB_URI_HERE",
    "JWT_SECRET": "SOME_SALT_HERE"
  },
  "development": {
    "PORT": "YOUR_PORT_HERE",
    "MLAB_URI": "YOUR_MONGODB_URI_HERE",
    "JWT_SECRET": "SOME_SALT_HERE"
  }
}
```

