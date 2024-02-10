import { Server } from "socket.io";
import { getDocument, updateDocument } from "./controllers/document.controller.js";
import dotenv from 'dotenv';
import express from 'express';
import connection from "./database/db.js"; 
import app from './app.js';
import path from 'path';
dotenv.config();
connection();


// const io = new Server(process.env.SOCKET_PORT, {
//   // cors: {
//   //   origin:process.env.FRONTEND_URL,
//   //   credentials: true,
//   //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   //   allowedHeaders: ['Content-Type', 'Authorization'],
//   //   optionsSuccessStatus: 204,
//   //   allowEIO3: true // Enable CORS for Socket.IO
//   // },
// });

// // CODE FOR SOCKET.IO IN BACKEND
// io.on('connection', (socket) => {
//     socket.on('get-document', async (documentId) => {
//       const document = await getDocument(documentId);
//       if(document){
//         socket.join(documentId);
//         socket.emit('load-document', document.data);
//       }
//       socket.on("send-changes", (delta) => {
//         socket.broadcast.to(documentId).emit('receive-changes', delta);
//     })
      
//     socket.on('save-document', async (data) =>{
//       await updateDocument(documentId,data);
//     } )
//   });
// });


// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname1, '/client/build')));

  app.get('*', (req,res)=> {
    res.send('server is working');
    // res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  })
// }else{
//   app.get('/',(req,res)=> {
//     res.send('API is running successfully');
//   })
// }


app.listen(process.env.APP_PORT,()=>{
  console.log(`server is up at ${process.env.APP_PORT}`);
})

