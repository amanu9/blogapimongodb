const {PORT,CONNECTION_URL,JWT_SECRET,SENDER_EMAIL,EMAIL_PASSWORD}=process.env
module.exports={
    port:PORT,connection_url:CONNECTION_URL, 
   jwtSecret: JWT_SECRET, 
    senderemail:SENDER_EMAIL,
    emailPassword:EMAIL_PASSWORD};