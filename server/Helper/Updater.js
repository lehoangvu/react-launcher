var mongo = require('../db/mongo');
var timeoutUpdates = [];
function createCronUpdate(type, id, callback, timeout) {
    var timeoutName = type + '-' + id;
    if(timeoutUpdates[timeoutName]) {
        clearTimeout(timeoutUpdates[timeoutName]);
        delete timeoutUpdates[timeoutName];
    }
    timeoutUpdates[timeoutName] = setTimeout(callback, timeout);
    
}
var Updater = {
    createCronUpdateVote: (question_id) => {
        createCronUpdate('vote', question_id, () => {
            mongo.countv2('user_react_question', {
                action: 'vote',
                question_id: question_id,
                value: 1
            }).then((count)=>{
                mongo.updateDocument('qna', { $set: {vote: count}}, question_id).then(()=>{
                    // no track result
                }).catch((err)=>{
                    // no track resul
                });
            }).catch((err)=>{
                // no track resul
            });

            mongo.countv2('user_react_question', {
                action: 'vote',
                question_id: question_id,
                value: -1
            }).then((count)=>{
                mongo.updateDocument('qna', { $set: {down_vote: count}}, question_id).then(()=>{
                    // no track result
                }).catch((err)=>{
                    // no track resul
                });
            }).catch((err)=>{
                // no track resul
            });
        }, 2000);
    },
    createCronUpdateAnswer: (question_id) => {
        createCronUpdate('answer', question_id, () => {
            mongo.countv2('qna', {
                type: 'answer',
                question_id: mongo.toObjectId(question_id)
            }).then((count)=>{
                mongo.updateDocument('qna', { $set: {reply: count}}, question_id).then(()=>{
                    console.log('ok');
                }).catch((err)=>{
                    console.log('err');
                });
            }).catch((err)=>{
                console.log('err');
            });
        }, 2000);
    },
    createCronUpdateView: (question_id) => {
        createCronUpdate('view', question_id, () => {
            mongo.countv2('user_react_question', {
                action: 'view',
                question_id: question_id
            }).then((count)=>{
                mongo.updateDocument('qna', { $set: {view: count}}, question_id).then(()=>{
                    // no track result
                }).catch((err)=>{
                    // no track result
                });
            }).catch((err)=>{
                // no track result
            });
        }, 2000);
    }
};
module.exports = Updater;