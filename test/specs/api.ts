
import { expect as expectChai } from 'chai'
import axios from 'axios';


describe('API Tests', function () {
    it('should return all customers', async function () {
    const response = await
    axios.get('https://dummy.restapiexample.com/api/v1/employees');
    console.log(response.data.message)
    expectChai(response.data.message).to.equal('Successfully! All records has been fetched.');
    console.log("statusCode"+response.status)
    expectChai(response.status).to.equal(200);
    });

    // it('get customer details for id 1', async function () {
    //     const response = await
    //     axios.get('https://dummy.restapiexample.com/api/v1/employees/1');
    //     console.log(response.data.message)
    //     expectChai(response.status).to.equal('success');
    //     expectChai(response.data.employee_name).to.equal('Tiger Nixon');
    //     console.log("statusCode"+response.status)
    //     expectChai(response.status).to.equal(200);
    //     });

    //     it.skip('should create a new user', async function () {
    //         const userData = {"name":"test","salary":"123","age":"23"};
    //         const response = await
    //         axios.post('https://dummy.restapiexample.com/api/v1/create', userData);
    //         console.log(response)
    //         expectChai(response.status).to.equal(201);
    //         });

});


    