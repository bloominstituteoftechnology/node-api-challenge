exports.seed = function(knex, Promise) {
	return knex('projects').insert([
		{
			id: 1,
			name: 'Complete Node.js and Express Challenge',
			description: 'Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!'
		}
	]);
};
