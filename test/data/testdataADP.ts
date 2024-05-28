import { ADPTwoWheeler } from './adpTwoWheeler';
import Excel from 'exceljs';
import * as path from 'path';
import { fileURLToPath } from 'url';

class TestDataADP {

  public async readUserData() {
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename); // get the name of the directory
    const filePath = path.resolve(__dirname, 'testdata.xlsx'); // getthe filepath

    const workbook = new Excel.Workbook();    
    const content = await workbook.xlsx.readFile(filePath);
    // const worksheet = content.worksheets[0];
    const worksheet = content.getWorksheet('ADP_TwoWheeler');

    if (!worksheet) {
      throw new Error('Worksheet not found');
    }

    const numberOfRows = worksheet?.rowCount
    console.log('********* numberOfRows ********' + numberOfRows)

    let data: ADPTwoWheeler[] = [];

    worksheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        const rowData: ADPTwoWheeler = {
            TestDataID: row.getCell(1).value as string,
            Application: row.getCell(2).value as string,
            Coverage: row.getCell(3).value as string,
            BusinessType: row.getCell(4).value as string,
             OfficeCode: row.getCell(5).value as string,
            Brand: row.getCell(6).value as string,
            model: row.getCell(7).value as string,
            YearOfManufacture: row.getCell(8).value as string,
             RegistrationDate: row.getCell(9).value as string,
            CityOfRegistration: row.getCell(10).value as string,
            // DailyCashAllowance: row.getCell(11).value as string,
            // EMI: row.getCell(12).value as string,
            // SelectTimeExcess: row.getCell(13).value as string,
            // NumberofEMI: row.getCell(14).value as string,
            // RegistrationCost: row.getCell(15).value as string,
            // RoadTax: row.getCell(16).value as string,
            // PremiumAmount: row.getCell(17).value as string,
            // GSTAmount: row.getCell(18).value as string,
            // TotalAmount: row.getCell(19).value as string,
            // Title: row.getCell(20).value as string,
            // fullName: row.getCell(21).value as string,
            // MobileNumber: row.getCell(22).value as string,
            // Email: row.getCell(23).value as string,
            // DOB: row.getCell(24).value as string,
            // Gender: row.getCell(25).value as string,
            // RegistrationNo: row.getCell(26).value as string,
            // YOM: row.getCell(27).value as string,
            // EngineNo: row.getCell(28).value as string,
            // ChassisNo: row.getCell(29).value as string,
            // pincode: row.getCell(30).value as string,
            // city: row.getCell(31).value as string,
            // area: row.getCell(32).value as string,
            // HouseNo: row.getCell(33).value as string,
            // street: row.getCell(34).value as string,
            // nomineeName: row.getCell(35).value as string,
            // nomineeRelation: row.getCell(36).value as string,
            // nomineeAge: row.getCell(37).value as string,
            // kycVerification: row.getCell(38).value as string,
            // verificationNo: row.getCell(39).value as string,
            // PaymentMode: row.getCell(40).value as string,
            // paymentOption: row.getCell(41).value as string,
            // AllBanks: row.getCell(42).value as string,
            // BankStatus: row.getCell(43).value as string,
             BodyColor: row.getCell(44).value as string
        };
      if (rowNumber > 1) { // Skip header row
        data.push(rowData);
      }
    });
    return data;

  }
}

export default new TestDataADP();
