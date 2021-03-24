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

  var code = `import time, sys, base64;start = time.time();sys.stdout=open('./server/output.out', 'w', encoding='utf8');
` + 
  req.body.code +
`
sys.stdout=open('./server/running_time.out', 'w', encoding='utf8');print('Running time: ',end='');print(time.time() - start)`;

  fs.writeFile(`./server/exec.py`, code, function(err){
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
        return res.json({ success: false, result: err.message })
      
      } else{
        fs.readFile('./server/output.out', 'utf8', function(err, data){
          fs.readFile('./server/running_time.out', 'utf8', function(err2, data2){
            return res.json({ success: true, result: sanitizeHtml(data), runningTime: data2})
          })
        })
      }
    })

  })

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})