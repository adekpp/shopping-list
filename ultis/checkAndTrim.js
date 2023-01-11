function checkAndTrim(input) {
  if (input.replace(/^\s+|\s+$/g, "") === "") {
    console.log("Input is empty");
    return;
  }
  input = input.replace(/^\s+/, "");
  console.log(input);
}

export default checkAndTrim