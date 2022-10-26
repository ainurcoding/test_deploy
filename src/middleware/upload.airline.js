const multer = require("multer");
const path = require("path");

const multerUpload = multer ({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/airlines_logo");
        },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        const filename = Date.now() + "" + ext;
        cb(null, filename);
    }
    }),

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        console.log(ext);
        if(
            ext.toLowerCase() === ".jpg" || 
            ext.toLowerCase() === ".png" || 
            ext.toLowerCase() === ".jpeg"
        ) {
            cb(null, true);
        }else{
            const error = {
                message: "Format image must be jpg, png, or jpeg",
            };
            cb(error, false);
        }
    },
});

const uploadAirline = (req, res, next) => {
    const multerSingle = multerUpload.single("logo");
    multerSingle(req, res, (err) => {
        if(err){
            res.json({
                message: "err",
                error: err
            });
        }else{
            next();
        }
    });
};

module.exports = uploadAirline;
