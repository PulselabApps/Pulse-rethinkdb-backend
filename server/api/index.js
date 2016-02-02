import { Router } from 'express';
import facets from './facets';
import v1 from './v1';

export default function() {
	var api = Router();

	// mount the facets resource
	api.use('/facets', facets);
  api.use('/v1', v1());
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			version : '1.0'
		});
	});

	return api;
}
