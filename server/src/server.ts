import express from 'express';

const app = express();

app.get('', function(request, response){
  response.send('comia fodase');
});

app.listen(3333);

export default app;