const express=require("express")
const ConnectDB=require('./Connection/NotesDb')
const RouterPath=require('./Router/Auth')
const cors = require('cors');
const dotenv=require('dotenv')
dotenv.config()

const App=express();
 
App.use(cors({
    origin:"*"
}));
App.use(express.json())

ConnectDB();

App.use("/api/notes/",RouterPath)
const PORT=3000;
App.listen(PORT,()=>console.log(`Server is Runing in Port ${PORT}`))
