
import fs from 'fs';

const fsPromis=fs.promises;
async function log(logData) {
    try{
      logData=new Date().toString()+"this is data"+logData;
      await fsPromis.appendFile('log.txt',logData)
    }catch(err){
        console.log(err);
    }
}

const logmiddleware= async (req,res,next)=>{
    const logdata=`${req.url} - ${JSON.stringify(req.body)}`;
    await log(logdata);
    next();
}

export default logmiddleware;