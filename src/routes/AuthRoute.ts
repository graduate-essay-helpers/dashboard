// import express from 'express';
// import {authController} from '../controllers';
// import {LoginRequest} from '../requests/LoginRequest';
// import RequestValidator from '../middleware/RequestValidator';
// import MulterFileHandler from '../middleware/MulterFileHandler';

// const router = express.Router();

// router.get('/get-files', authController.getFiles);
// router.post('/login', RequestValidator.validate(LoginRequest), authController.login);
// router.post('/upload-file', MulterFileHandler.getInstance().single('file'), authController.uploadFile);