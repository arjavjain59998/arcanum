var butt = document.querySelector("#button1");
var finished = false;
var qno = 3;
var exist;
var mydiv = document.querySelector("#file");
var atag = document.createElement("a");

atag.setAttribute("href", "../finish_day1.html");
atag.innerHTML = "proceed to finish..<br><br>";
butt.onclick = function() {
    var submission = document
        .querySelector("#answer_submission")
        .value.toLowerCase();

    console.log("hi");
    ansDb = firebase.database().ref("answers");
    var correctAns = "hello";
    ansDb.on("value", function(snapshot) {
        correctAns = snapshot.val()[qno];
        console.log(correctAns);
        finished = true;
        if (finished) {
            if (user) {
                console.log("hi");
                // var date = newdate();
                // console.log("ubmission" + submission);
                // console.log("correct ans =" + correctAns);
                if (submission === correctAns) {
                    alert("Correct");
                    var data = {
                        uid: user.uid,
                        time: new Date().getTime(),
                        status: true,
                        email: user.email,
                        questionNumber: qno,
                        submission: submission
                    };
                    var ok = 0;
                    var questions = [];
                    var usr;
                    var itemsProcessed = 0;
                    db = firebase.database().ref("responses");
                    var flag = 0;

                    db.once("value").then(async snapshot => {
                        await snapshot.forEach(element => {
                            usr = element.val();
                            if (usr.uid === user.uid) {
                                questions.push(usr.questionNumber);
                                console.log(usr.questionNumber);
                                if (usr.questionNumber === qno) {
                                    console.log("caught");
                                    exist = true;
                                    flag = 1;
                                } else {
                                    if (flag !== 1) {
                                        console.log("here2");
                                        exist = false;
                                    }
                                }
                            }

                            // console.log(element.val().uid);
                            // console.log(element.val().questionNumber);
                            // console.log(element.val().status);
                        });
                        console.log(exist);
                        if (exist === true) {
                            alert("sorry no resubmissions");
                            mydiv.appendChild(atag);
                        } else if (exist === false) {
                            db.push(data);
                            console.log("here");
                            mydiv.appendChild(atag);
                        }
                        if (questions.length === 0) {
                            console.log("lol");
                            db.push(data);
                            mydiv.appendChild(atag);
                        }
                    });
                } else {
                    alert("Wrong answer");
                }
            } else {
                alert("Sign in");
            }
        }
    });
};
