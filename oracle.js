const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');  // db연결정보 파일

/* todo 오라클 환경 완성. retemfo 계정 연결 확인*/

async function main() {

    const testSql = "SELECT * FROM TEST";
    const options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };

    let conn = null;

    try {
        oracledb.initOracleClient({libDir: 'C:/Java/instantclient_21_11'});
        conn = await oracledb.getConnection(dbconfig);


        const result = await conn.execute(testSql);
        // await conn.commit(); // oracle은 기본적으로 auto commit이 아니라서 그렇다.

        console.log(result);

    } catch(ex) {
        console.log(ex)
    } finally {
        if (conn) {
            try {
                await conn.close();
                console.log('오라클 데이터베이스 접속 해제 성공')
            }catch(ex) {
                console.error(ex);
            }
        }
    }
}
main();