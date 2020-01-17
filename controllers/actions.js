
const actionDb = require('../data/helpers/actionModel');
// const projectDb = require('../data/helpers/projectModel');

// @desc: Get all actions
// @ route: GET /api/projects/:id/actions
// @access: private

// exports.geActions = (req, res) => {
//     const id = req.params.id;

//     actionDb.get()
//     .then(actions => res.status(200).json(actions))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             errorMessage: 'Unable to retrieve actions from the server'
//         })
//     })
// }

// @desc: Create single action
// @ route: POST api/projects/:id/actions
// @access: private

exports.createAction = (req, res) => {
    // console.log('params', req.params);
    actionDb.insert(req.body)
    
    .then(action => res.status(201).json(action))
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Unable to create a action to the server'
        })
    })
}



// @desc: Get a action for a speicifc project id
// @ route: GET api/projects/:id/actions/:id
// @access: private

exports.getAction = (req, res) => {
    const id  = req.params.id;
    console.log('id', id);
    actionDb.get(id)
    .then(action => res.status(200).json(action))
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Unable to retrieve a action from the server'
        })
    })
}


// @desc: Update a action for a specific project id
// @ route: PUT /api/projects/:id/actions/:id
// @access: private

exports.updateAction = (req, res) => {
    const id = req.params.id;

    actionDb.update(id, req.body)
    .then(action => res.status(200).json(action))
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Unable to update a action to the server'
        })
    })
}

// @desc: Romve a action for a specific project id
// @ route: DELETE /api/projects/:id
// @access: private

exports.removeAction = (req, res) => {
    const id = req.params.id;

    actionDb.remove(id)
    .then(count => {
        if (count > 0)
        res.status(200).json(`the number of action deleted: ${count}`)
        else 
        res.status(404).json('No action to delete for this id')
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errorMessage: 'Unable to remove a action from the server'
        })
    })
}