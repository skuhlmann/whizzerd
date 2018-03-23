var path = require('path');

var appRouter = function(app, data) {

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../../index.html'));
  });

  app.get('/heading', (req, res) => {
    res.sendFile(path.join(__dirname + '../../components/heading/heading.html'))
  })
  
  //Add new routes here - do not remove this line//
}

module.exports = appRouter;