import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import ProjectService from '../../services/project';
import { Logger } from 'winston';
const multer = require('multer');
import * as multer from 'multer';
import path from 'path';
import Loki from 'lokijs';
const ejs = require('ejs');
const fs = require('fs');

import { imageFilter, loadCollection, cleanFolder } from '../../utils';
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter });
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });
const route = Router();

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

export default (app: Router) => {
  app.use('/photos', route);

  route.post('/upload', upload.array('photos', 12), async (req, res) => {
    try {
      const col = await loadCollection(COLLECTION_NAME, db);
      let data = [].concat(col.insert(req.files));

      db.saveDatabase();
      res.send(data.map(x => ({ id: x.$loki, fileName: x.filename, originalName: x.originalname })));
    } catch (err) {
      res.sendStatus(400);
    }
  });

  route.get('/images/:id', async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        const result = col.get(req.params.id);

        if (!result) {
            res.sendStatus(404);
            return;
        };

        res.setHeader('Content-Type', result.mimetype);
        fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
        return ;
    } catch (err) {
        res.sendStatus(400);
    }
})

  // custom API to get project
  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Project endpoint with body: %o', req.body);
    try {
      const projectServiceInstance = Container.get(ProjectService);
      const { projects } = await projectServiceInstance.GetProjects();
      return res.status(201).json({ projects });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
