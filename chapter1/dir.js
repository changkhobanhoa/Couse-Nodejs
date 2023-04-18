const fs = require("fs");
if(!fs.existsSync('./')){

    fs.mkdir("./new", (err) => {
        if (err) throw err;
        console.log("directory created");
    });
}
if(fs.existsSync('./new')){
    fs.rmdir('./new',(err)=>{
        if(err) throw err;
        console.log("Directory deleted");
    })
}
