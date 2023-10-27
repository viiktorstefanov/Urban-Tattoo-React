const multer = require('multer');

function fileTransfer() {

    const storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "../src/assets/images/tattoos");
        },
        filename: function(req, file, callback) {
            const originalName = file.originalname;
            const typeOfFile = originalName.split('.')[1];
    
            const uploadedFile = "IMG0003" +`${(Math.random()* 10000000).toFixed(0).toString().slice(0,9)}.${typeOfFile}`;
    
            
            callback(null, file.filename = uploadedFile);
            
        }
    });
    
    const uploads = multer({storage: storage});
    return uploads;
}

module.exports =  fileTransfer;