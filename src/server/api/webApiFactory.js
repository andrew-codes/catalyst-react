'use strict';

export default (dataService) => {
    return (request, response)=> {
        let status = 200;
        let data = {
            total: 20,
            articles: []
        };
        response
            .status(status)
            .contentType('application/json')
            .send(data);
    };
}