/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/
const express = require("express");
const projectHelpers = require("./data/helpers/projectModel");
const actionHelpers = require("./data/helpers/actionModel");

const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());
const PORT = 6565;

app.get("/api/projects", (req, res) => {
  projectHelpers.get().then(stuff => {
    res.status(200).json({ stuff });
  });
});
app.post("/api/projects", (req, res) => {
  projectHelpers.insert(req.body).then(project => {
    res.status(200).json({ project });
  });
});
app.put("/api/projects/:id", (req, res) => {
  const value = req.body;
  const id = req.params.id;
  projectHelpers.update(id, value).then(stuff => {
    if (stuff == null) {
      res.status(404).send("the ID does not match any in the database");
    } else {
      res.status(201).json({ stuff });
    }
  });
});
app.delete("/api/projects/:id", (req, res) => {
  const id = req.params.id;
  projectHelpers.remove(id).then(stuff => {
    if (stuff == 1) {
      res.status(400).send("THE PROJECT AS BEEN DELETED");
    } else {
      res.status(404).send(" the id is not correct");
    }
  });
});

//CRUD for actions
app.get("/api/actions", (req, res) => {
  actionHelpers.get().then(action => {
    res.status(200).json({ action });
  });
});

app.post("/api/actions", (req, res) => {
  actionHelpers.insert(req.body).then(stuff => {
    res.status(200).json({ stuff });
  });
});

app.put("/api/actions/:id", (req, res) => {
  const value = req.body;
  const id = req.params.id;
  actionHelpers.update(id, value).then(alex => {
    if (alex == null) {
      res.status(404).send("the ID does not match any in the database");
    } else {
      res.status(201).json({ alex });
      //     }
    }
    console.log(alex);
  });
});

// app.delete("/api/actions/:id", (req, res) => {
//   const id = req.params.id;
//   actionHelpers.remove(id).then(stuff => {
//     if (stuff == 1) {
//       res.status(400).send("THE PROJECT AS BEEN DELETED");
//     } else {
//       res.status(404).send(" the id is not correct");
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`i am listening on ${PORT}`);
});
