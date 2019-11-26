var firebaseConfig = {
  apiKey: "AIzaSyA7mG7hT13bR8UMGPtbnUflvmurEX3LKE0",
  authDomain: "train-schedule-8e917.firebaseapp.com",
  databaseURL: "https://train-schedule-8e917.firebaseio.com",
  projectId: "train-schedule-8e917",
  storageBucket: "train-schedule-8e917.appspot.com",
  messagingSenderId: "75561792700",
  appId: "1:75561792700:web:19db16d17d1d4e005d4cb9",
  measurementId: "G-EGBSE8BTK1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var database = firebase.database();
var trains = database.ref("/trains");

database.ref("/trains").on("value", function (snapshot) { 
  console.log(snapshot)
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

database.ref("/trains").on("child_added", function (childSnapshot) {
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var freq = childSnapshot.val().freq;
  var firstTrainTimeConverted = moment(firstTrainTime,"LT");

  if (firstTrainTimeConverted.diff(moment(),"minutes") > 0) { //if train is scheduled to come in the future
      // console.log("we arrived!");
      var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destination),
          $("<td>").text(freq),
          $("<td>").text(firstTrainTimeConverted.format("MM/DD/YYYY hh:mm A")), 
          $("<td>").text(firstTrainTimeConverted.diff(moment(),"minutes"))
      );
      $("#train-table > tbody").append(newRow);
  } 
  else {
      var tFrequency = freq;
      var firstTime = firstTrainTime;
  
      
      var firstTimeConverted = moment(firstTime, "hh:mm");
      // console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      // console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      // console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      // console.log("ARRIVAL TIME: " + moment(nextTrain).format("MM/DD/YYYY hh:mm A"));

      var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destination),
          $("<td>").text(freq),
          $("<td>").text(moment(nextTrain).format("MM/DD/YYYY hh:mm A")),
          $("<td>").text(tMinutesTillTrain)
      );
      $("#train-table > tbody").append(newRow);
  }
});

//submit click comes here 
$("#user-submit").on("click", function (e) {
  e.preventDefault();

  trainName = $("#train-name").val().trim();
  dest = $("#destination").val().trim();
  firstTrainTime = $("#first-train-time").val().trim();
  freq = $("#freq").val().trim();

  var trainObj = {
      name: trainName,
      dest: dest,
      firstTrainTime: firstTrainTime,
      freq: freq
  };
  trains.push(trainObj);

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#freq").val("");
});