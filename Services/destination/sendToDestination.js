let connMgr = require('../../util/ConnectionMgr');
const validate = function(inputs){
    if(typeof inputs.qAddr === 'undefined'){
        throw "Invalid queue address"
    }

    if(inputs.qType.trim() === ''){
        throw "Invalid queue type: "
    }

    if(typeof inputs.message === 'undefined'){
        throw "Invalid Message"
    }

};

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){

        let returnData = {};

        try{
            validate(inputs);
            // if(inputs.type === 'topic'){
            //     connMgr.sendTopic(inputs.ipAddress, inputs.port, inputs.username, inputs.password, inputs.destination, inputs.content);
            // }else if(inputs.type === 'queue'){
            //     connMgr.sendQueue(inputs.ipAddress, inputs.port, inputs.username, inputs.password, inputs.destination, inputs.content);
            // }
            connMgr.send(inputs.qAddr, inputs.qType, inputs.message);
            
            returnData["status"] = "Ok";
            returnData["details"] = "Send to destination completed.";
            returnData["data"] = inputs;
            callback(returnData);
            
        }catch(err){
            
            returnData["status"] = "Failed";
            returnData["details"] = "Send to destination failed. Error: " + err;
            returnData["data"] = inputs;
            callback(returnData);
        }

    }
};

module.exports = operation;