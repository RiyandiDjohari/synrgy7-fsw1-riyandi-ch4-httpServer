const http = require("http");
const people = require("./people");

const getPeople = (req, res) => {
  res.writeHead(200).end(JSON.stringify(people));
};

const getDetailPeople = (req, res, id) => {
  const person = people.find((person) => person.id === parseInt(id));
  person ? res.writeHead(200).end(JSON.stringify(person)) : res.writeHead(404).end("Data Not Found");
};

const getPeopleByUsername = (req, res, value) => {
    const filteredPerson = people.filter((person) => person.username.toLowerCase().includes(value.toLowerCase()));
    filteredPerson ? res.writeHead(200).end(JSON.stringify(filteredPerson)) : res.writeHead(404).end("Data Not Found");
}

const handleDeletePeople = (req, res, id) => {
  const index = people.findIndex((person) => person.id === id);
  if (index !== -1) {
    people.splice(index, 1);
    res.end(`Data with id ${id} successfully deleted`);
  } else {
    res.writeHead(404).end("Not Found");
  }
};

const onRequest = (req, res) => {
  const splittedUrl = req.url.split("/")[2];
  const id = +splittedUrl;
  const { method, url } = req;

  if (method === "GET" && url === "/people") {
    getPeople(req, res);
  } else if (method === "GET" && id) {
    getDetailPeople(req, res, id);
  } else if (method === "DELETE" && id) {
    handleDeletePeople(req, res, id);
  } else if (method === "GET" && splittedUrl) {
    getPeopleByUsername(req, res, splittedUrl)
  } else {
    res.writeHead(404).end("Not Found");
  }
};

const server = http.createServer(onRequest);

server.listen(8000, "localhost", () => console.log("server is running..."));

// Get list people  /people
// Get Detail People  /people/:id
// Delete People /people/:id | Res: Data dgn id sekian berhasil didelete
// Get People By username /people/:username , using Filter
