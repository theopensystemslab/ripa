const max = 26; // 26 letters

export const setResponseKey = i => {
  let responseKey = [];
  if (i >= max) {
    const iterations = Math.floor(i / max);
    const remainder = i % max;
    responseKey = [65 + remainder];
    for (let j = 0; j < iterations; j = j + 1) {
      responseKey.push(65 + remainder);
    }
  } else {
    responseKey = [65 + i];
  }
  return responseKey;
};

let keysPressed = [];

export const keyBtnSelect = (e, options, setSelection) => {
  if (
    e.keyCode >= 65 &&
    e.keyCode < options.length + 65 &&
    e.keyCode < 65 + max
  ) {
    // check that the key pressed is a valid selection key
    if (!keysPressed.length) {
      // if a key hasn't been pressed in the last 500ms

      // add e.keycode to array
      keysPressed.push(e.keyCode);

      const selectResponse = () => {
        const selection =
          max * (keysPressed.length - 1) + (keysPressed[0] - 65); // make sum of array and to calculate index of selection

        setSelection(selection); // run setSelection function
      };

      if (options.length > max) {
        // if length of options list is longer than max set timeout to allow double key press
        setTimeout(() => {
          // when timer runs out key presses are done. run select function
          selectResponse(); // select the response
          keysPressed = []; // reset array
        }, 400);
      } else {
        // no timeout allow only single key
        selectResponse();
        keysPressed = [];
      }
    } else {
      if (keysPressed.length < Math.ceil(options.length / max)) {
        // check if list length is longer than max to see how many keypresses are allowed
        if (e.keyCode !== keysPressed[0]) {
          keysPressed = [e.keyCode];
        } else {
          keysPressed.push(e.keyCode);
        }
      }
    }
  }
};
