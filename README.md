# RESTFUL API using Express.js
RESTFUL API using Express.js with JWT Authentication and MongoDB Database Connection (Prototype)

# API Documentation
[Click here to see the documentation.](https://app.getpostman.com/join-team?invite_code=af8b5e5b093ae13f9e1fcf4e7fec25c1&target_code=5fef36d5f97bf4363253bdca28690cf7)

# Features
- Authentication (Register, Login, Logout, and Refresh Access Token)
- Transaction Post Data (Create, Read, Update, and Delete Data)

# Usage
The data transaction feature requires authorization of the bearer token in every transaction. To get an access token, you need to register as a user and then log in using that account.
- After getting the access token, you need to copy the token and paste it in Authorization > Bearer Token
- If the token has expired, you need to refresh the token again (How to refresh the token is in the API Documentation)

*Note:*
- _Access token will expire in 2 minutes_
- _Refresh Token will expire within 1 day_
