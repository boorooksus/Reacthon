const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
var fs = require('fs')
var sanitizeHtml = require('sanitize-html');
var {PythonShell} = require('python-shell');

// application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게함
app.use(bodyParser.urlencoded({extended: true}));
// application/jason 을 분석해서 가져올 수 있게함
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/api/compiler', (req, res) => {

  console.log(req.body);

  // console.log('res: ', res)
  // console.log('res.req: ', res.req)

  var sanitizedCode = `import time, sys, base64;start = time.time();sys.stdout=open('./server/output.out', 'w', encoding='utf8');
` + 
  sanitizeHtml(req.body.code) +
  `
print();print('Running time: ',end='');print(time.time() - start)`;

  fs.writeFile(`./server/exec.py`, sanitizedCode, function(err){
    // 파이썬 파일을 실행
    var options = {
      mode: 'text',
      pythonPath: '', 
      pythonOptions: ['-u'],
      scriptPath: `${__dirname}`,
      args: [ 'value1', 'value2', 'value3'] // 전달인자(sys.argv[i] 사용하면 받을 수 있음)
    };

    PythonShell.run('/exec.py', options, function (err, results){
      if (err) {
        console.log('err: ', err.message);
        return res.json({ success: false, errorMessage: err.message })
      
      } else{
        fs.readFile('./server/output.out', 'utf8', function(err, data){
          console.log('data: ', data);
          return res.json({ success: true, result: data})
        })
      }
    })

  })

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})