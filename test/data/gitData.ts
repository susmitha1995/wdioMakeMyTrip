// testdataxlsx.ts
import { Git } from './githubdata';
import Excel from 'exceljs';
import * as path from 'path';
import { fileURLToPath } from 'url';

class TestDataGit {

  public async readUserData() {
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename); // get the name of the directory
    const filePath = path.resolve(__dirname, 'testdata.xlsx'); // getthe filepath

    const workbook = new Excel.Workbook();    
    const content = await workbook.xlsx.readFile(filePath);
    // const worksheet = content.worksheets[0];
    
      const worksheet = content.getWorksheet('git');
    

    if (!worksheet) {
      throw new Error('Worksheet not found');
    }

    const numberOfRows = worksheet?.rowCount
    console.log('********* numberOfRows ********' + numberOfRows)

    let data: Git[] = [];

    worksheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      const rowData: Git = {
        path : row.getCell(1).value as string,
        tab : row.getCell(2).value as string,
        subTab : row.getCell(3).value as string
       
      };
      if (rowNumber > 1) { // Skip header row
        data.push(rowData);
      }
    });
    return data;

  }
}

export default new TestDataGit();
