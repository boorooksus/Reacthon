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
// code: 파이썬 코드
// (실행 시간 측정 코드 + 실행 결과를 파일에 저장하는 코드 + 
// 입력 받은 코드 + 
// 실행 시간을 파일에 출력하는 코드)
  var code = `import time, sys, base64;start = time.time();sys.stdout=open('./server/output.out', 'w', encoding='utf8');
` + 
  req.body.code +
`
sys.stdout=open('./server/running_time.out', 'w', encoding='utf8');print('Running time: ',end='');print(time.time() - start)`;

  // code를 exec.py 파일로 만듦
  fs.writeFile(`./server/exec.py`, code, function(err){
    // exec.py 파일을 실행
    var options = {
      mode: 'text',
      pythonPath: '', 
      pythonOptions: ['-u'],
      scriptPath: `${__dirname}`,
      args: [ 'value1', 'value2', 'value3'] 
    };

    PythonShell.run('/exec.py', options, function (err, results){
      if (err) {
        // 코드에 에러가 있는 경우: err.message로 에러 내용 보냄
        return res.json({ success: false, result: err.message })
      
      } else{
        // 코드 실행이 성공적인 경우
        // 결과 파일을 읽고 프론트 엔드로 보냄
        fs.readFile('./server/output.out', 'utf8', function(err, data){
          // sanitizeHtml: 꺽쇠 제거(보안 위해서)
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