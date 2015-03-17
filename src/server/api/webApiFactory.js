'use strict';

export default (dataService) => {
    return (request, response)=> {
        try {
            response.setHeader('Access-Control-Allow-Origin', '*');
            let status = 200;
            let data = {
                total: 20,
                articles: []
            };
            response
                .status(status)
                .contentType('application/json')
                .send(data);
        }
        catch (error) {
            console.log(error);
        }
    };
}