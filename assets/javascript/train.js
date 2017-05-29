  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAwDT_DZ2hjWOb_wjFICI77BE3sRX26l5I",
    authDomain: "mytrainscheduler-619b7.firebaseapp.com",
    databaseURL: "https://mytrainscheduler-619b7.firebaseio.com",
    projectId: "mytrainscheduler-619b7",
    storageBucket: "mytrainscheduler-619b7.appspot.com",
    messagingSenderId: "653864422245"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    var TrainName = "";
    var Destination = "";
    var Frequency = "";
    var NextArrival= "";
    var MinutesAway= "";

$("#addTrain").on("click", function(event) {
  event.preventDefault();
  
  TrainName = $("#TrainName").val().trim();
  Destination = $("#Destination").val().trim();
  FirstTrain = moment($("#FirstTrain").val().trim(), "HH:MM").format("X");
  console.log(FirstTrain);
  monthlyRate = $("#Frequency").val().trim();

  var newTrain = {
    Name: Name,
    Destination: Destination,
    FirstTrain: FirstTrain,
    Frequency: Frequency
  };

  database.ref().push(newTrain);



  $("#TrainName").val("");
  $("#Destination").val("");
  $("#FirstTrain").val("");
  $("#Frequency").val("");

});

database.ref().on("child_added", function(snapshot) {
  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var FirstTrain = moment(FirstT, "hh:mm").diff(moment.unix(snapshot.val().trainTime, "X"), "time");
  var NextArrival = FirstTrain * snapshot.val().MinutesAway;
  var TrainDetails = $("#TrainDetails")
  var tr = $("<tr/>");
  var tdTrainName = $("<td/>");
  tdTrainName.text(snapshot.val().TrainName);
  var tdDestination = $("<td/>");
  tdDestination.text(snapshot.val().Destination);
  var tdFirstTrain = $("<td/>");
  tdFirstTrain.text(moment.unix(snapshot.val().FirstTrain).format("hh:mm"));
  var Frequency = $("<td/>");
  Frequency.text(NextArrival);
  var NextArrival = $("<td/>");
  NextArrival.text(NextArrival);
  var MinutesAway = $("<td/>");
  tdMinutesAway.text(snapshot.val().MinutesAway);
  tr.append(tdTrainName).append(tdDestination).append(tdFirstTrain).append(tdNextArrival).append(tdMinutesAway);
  TrainDetails.append(tr);

});