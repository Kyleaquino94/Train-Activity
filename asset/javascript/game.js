var config = {
    apiKey: "AIzaSyAcT66myFmhRTEWjtug2Hf0pLS3g3pVmFs",
    authDomain: "train-schedule-70c64.firebaseapp.com",
    databaseURL: "https://train-schedule-70c64.firebaseio.com",
    projectId: "train-schedule-70c64",
    storageBucket: "",
    messagingSenderId: "87149992442",
    appId: "1:87149992442:web:fe718831c5dc17ea5fec43",
    measurementId: "G-745CHLCW2E"
};

  firebase.initializeApp(config);

  var database = firebase.database();


  var trainName   = "";
  var destination = "";
  var firstTrain  = 0;
  var frequency   = 0;
  var currentTime = moment()

  setInterval(function(){
    $("#time-input").html(moment(moment()).format("hh:mm:ss"));
  },1000);

  
  //Buttons for adding train
  $("#add-train").on("click",function(event){
    event.preventDefault();

    trainName   = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain  = $("#time-input").val().trim();
    frequency   =  $("#frequency-input").val().trim();


    //clears all of the text-boxes

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");


    database.ref().push({
      trainName:    trainName,
      destination:  destination,
      firstTrain:   firstTrain,
      frequency:    frequency,

    });
  });
  
  //Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added",function(childSnapshot){
    var firstTimeConverted=moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1,"days");

    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

    var remainder = timeDiff % childSnapshot.val().frequency;

    var minsUntilTrain = childSnapshot.val().frequency - remainder;

    var nextTrainTime = moment().add(minsUnitlTrain, "minutes");

  })




  