
const projectDb = require('../data/helpers/projectModel');
// @desc: Get all projects
// @ route: GET /api/projects
// @access: public

exports.getProjects = (req, res) => {
    projectDb.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Unable to retrieve projects from the server'
        })
    })
}

// @desc: Create single project
// @ route: POST /api/projects/
// @access: private

exports.createProject = (req, res) => {
    
    projectDb.insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Unable to create a project to the server'
        })
    })
}



// @desc: Get a project
// @ route: GET /api/projects/:id
// @access: public

exports.getProject = (req, res) => {
    const id  = req.params.id;
    projectDb.get(id)
    .then(project => res.status(200).json(project))
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Unable to retrieve a project from the server'
        })
    })
}

// @desc: Get a project actions
// @ route: GET /api/projects/:id/actions
// @access: private

exports.getProjectActions = (req, res) => {
    const id  = req.params.id;
    projectDb.getProjectActions(id)
    .then(actions => 
      
            res.status(200).json(actions)
        
        
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Unable to retrieve a action from the server'
        })
    })
}


// @desc: Update a project
// @ route: PUT /api/projects/:id
// @access: private

exports.updateProject = (req, res) => {
    const id = req.params.id;

    projectDb.update(id, req.body)
    .then(project => res.status(200).json(project))
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Unable to update a project to the server'
        })
    })
}

// @desc: Romve a project
// @ route: DELETE /api/projects/:id
// @access: private

exports.removeProject = (req, res) => {
    const id = req.params.id;

    projectDb.remove(id)
    .then(count => {
        if (count > 0)
        res.status(200).json(`the number of project deleted: ${count}`)
        else 
        res.status(404).json('No project to delete for this id')
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Unable to remove a project from the server'
        })
    })
}