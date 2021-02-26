import Multer from "../lib/multer";

const middleware = Multer.single("image");

export default middleware;
