const msmq = require('updated-node-msmq');

const connMgrVariables = {
    remoteTypeQueue: "REMOTE",
    localTypeQueue: "LOCAL"
}

let connMgr = {
    recieve: function(qAdd, queueType, handler){
        if( !queueType || queueType !== connMgrVariables.localTypeQueue){

            let queue = msmq.openOrCreateQueue(qAdd);
            queue.on('receive', (msg) => {
                handler(msg.body);
            });
            queue.startReceiving();

        }else if(queueType === connMgrVariables.remoteTypeQueue){

            let queue = msmq.connectToRemoteQueue(qAdd);
            queue.on('receive', (msg) => {
                handler(msg.body);
            });
            queue.startReceiving();

        }
    },
    send: function(qAdd, queueType, msg){
        if( !queueType || queueType !== connMgrVariables.localTypeQueue){

            let queue = msmq.openOrCreateQueue(qAdd);

            queue.send(msg);

        }else if(queueType === connMgrVariables.remoteTypeQueue){

            let queue = msmq.connectToRemoteQueue(qAdd);
            
            queue.send(msg);
            
        }
    }
};

module.exports = {connMgr, connMgrVariables};