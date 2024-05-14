// testdataxlsx.ts
import { Bus } from './bus';
import Excel from 'exceljs';
import * as path from 'path';
import { fileURLToPath } from 'url';

class TestDataBus {

  public async readUserData() {
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename); // get the name of the directory
    const filePath = path.resolve(__dirname, 'testdata.xlsx'); // getthe filepath

    const workbook = new Excel.Workbook();    
    const content = await workbook.xlsx.readFile(filePath);
    // const worksheet = content.worksheets[0];
    const worksheet = content.getWorksheet('bus');

    if (!worksheet) {
      throw new Error('Worksheet not found');
    }

    const numberOfRows = worksheet?.rowCount
    console.log('********* numberOfRows ********' + numberOfRows)

    let data: Bus[] = [];

    worksheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      const rowData: Bus = {
        purpose : row.getCell(1).value as string,
        ac : row.getCell(2).value as string,
        seatType : row.getCell(3).value as string,
        singleSeater: row.getCell(4).value as string,
        pickUpPoint: row.getCell(5).value as string,
        dropPoint :  row.getCell(6).value as string     
      };
      if (rowNumber > 1) { // Skip header row
        data.push(rowData);
      }
    });
    return data;

  }
}

export default new TestDataBus();
