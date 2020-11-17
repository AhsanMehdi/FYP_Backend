import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import agendash from './routes/agendash';
import profile from './routes/profile';
import project from './routes/project';
import campaign from './routes/campaign';
import chatBox from './routes/chatbox';




// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	agendash(app);
	profile(app);
	project(app);
	campaign(app);
	chatBox(app);


	return app
}