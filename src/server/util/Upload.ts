import * as multer from 'multer';
import * as dir from 'mkdirp';

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		const date = new Date();
		const folderName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		const path = 'dist/uploads/' + folderName;

		dir.sync(path, (err) => cb(null, path));

		cb(null, path);
	},
	filename: function(req, file, cb) {

		cb(null, file.originalname); // ??????
	},
});
const upload = multer({ storage });

export default upload;