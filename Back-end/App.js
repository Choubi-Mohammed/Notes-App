const express=require("express")
const ConnectDB=require('./Connection/NotesDb')
const RouterPath=require('./Router/Auth')
const cors = require('cors');

const App=express();

App.use(cors());
App.use(express.json())

ConnectDB();

App.use("/api/notes/",RouterPath)

const PORT=3000;
App.listen(PORT,()=>console.log(`Server is Runing in Port ${PORT}`))
