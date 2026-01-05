import multer from "multer";
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename:(req,file,cb)=>{
       const safeName = new Date().toISOString().replace(/:/g, '-') + file.originalname;
       cb(null, safeName);
    }
})

export const upload=multer({storage:storage});