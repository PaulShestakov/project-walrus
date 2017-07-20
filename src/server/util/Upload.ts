import * as multer from 'multer';

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		const date = new Date();
		const folderName = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
		const path = './uploads/' + folderName;

		cb(null, path);
	},
	filename: function(req, file, cb) {
		const path = `${file.originalname}-${Date.now()}`;

		cb(null, path);
	},
});

const upload = multer(storage);

export default upload;