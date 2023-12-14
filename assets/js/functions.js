const numberWithSpaces = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const zeroPad = (num, places = 2) => String(num).padStart(places, "0");

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getObjectLength = (object) => {
  return Object.values(object).length;
};

const getNumbersFromString = (str) => {
  if(typeof str === 'number') return str;
  const regex = /[-+]?([0-9]*(\,|\.)[0-9]+|[0-9]+)/g;
  const matches = str.match(regex);
  return matches;
}

const getFirstNumberFromString = (str) => {
  if(typeof str === 'number') return str;
  const match = getNumbersFromString(str);
  return match?.[0] ? Number(match?.[0]) : 0;
}

const generateErrorMessage = (error) => {
  let errorMessage = "Error text";

  if (error.response?.data?.errors) {
    Object.keys(error.response.data.errors).forEach((errorKey) => {
      if (error.response.data.errors[errorKey]) {
        const errorText = error.response.data.errors[errorKey];
        const formattedErrorText = Array.isArray(errorText)
          ? errorText.join(" ")
          : errorText;

        errorMessage = formattedErrorText;
      }
    });
  } else if (error.response?.statusText) {
    errorMessage = error.response.statusText;
  }

  return errorMessage;
};

const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

export {
  numberWithSpaces,
  numberWithDots,
  zeroPad,
  getRandomArbitrary,
  getRandomInt,
  getObjectLength,
  getNumbersFromString,
  getFirstNumberFromString,
  generateErrorMessage,
  declOfNum
};
