import $ from 'jquery';

let failedToDoErrors = function (errors) {
  $(".submit").removeClass("disabled").prop("disabled", false);

  let [titleErrors, descriptionErrors] = [[], []];

  errors.forEach (function (err) {
    switch (err[0]) {
      case "title":
        titleErrors.push(err[1][0]);
        $(".title-input").addClass("invalid");
        break;
      case "description":
        descriptionErrors.push(err[1][0]);
        $(".description-textbox").addClass("invalid");
        break;
    }
  });

  return [titleErrors, descriptionErrors];
};

export { failedToDoErrors };
