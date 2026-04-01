const { spawn } = require('child_process');

const ls = spawn('/flag', []); 

ls.stdout.on('data', (data) => {
  console.log(`출력: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`에러: ${data}`);
});

ls.on('close', (code) => {
  console.log(`프로세스 종료 코드: ${code}`);
});
