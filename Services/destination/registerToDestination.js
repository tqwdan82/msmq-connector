let connMgr = require('../../util/ConnectionMgr');
const validate = function(inputs){
    if(typeof inputs.qAddr === 'undefined'){
        throw "Invalid queue address"
    }

    if(inputs.qType.trim() === ''){
        throw "Invalid queue type: "
    }

    if(typeof inputs.handler === 'undefined'){
        throw "Invalid handler"
    }

};

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){

        let returnData = {};
        try{
            validate(inputs);
            connMgr.recieve(inputs.qAddr, inputs.qType, inputs.handler);

            returnData["status"] = "Ok";
            returnData["details"] = "Register to destination completed.";
            returnData["data"] = inputs;
            callback(returnData);
            
        }catch(err){
            
            returnData["status"] = "Failed";
            returnData["details"] = "Register to destination failed. Error: " + err;
            returnData["data"] = inputs;
            callback(returnData);
        }

    }
};

module.exports = operation;