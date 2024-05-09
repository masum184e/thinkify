import multer from "multer";
const uploadFile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${process.env.UPLOAD_DIRECTORY}/${file.fieldname}`)
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
})

export default uploadFile