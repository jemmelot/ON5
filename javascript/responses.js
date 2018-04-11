// log question responses
var responses = [];

function logOne(answerOne) {
	responses.push(answerOne);
};

function logTwo(answerTwo) {
	responses.push(answerTwo);
};

function logThree(answerThree) {
	responses.push(answerThree);
};

function getResponses(){
	return responses;
}