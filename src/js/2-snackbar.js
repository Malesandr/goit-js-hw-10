'use strict';

import iziToast from "izitoast";

  
  document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

  const form = document.querySelector('.form');
  
  const delayValue = document.querySelector('[name="delay"]');
  const stateValue = document.querySelectorAll('[name="state"]');
  
  const delay = parseInt(delayValue.value);
  const state = Array.from(stateValue).find(input => input.checked).value;
  
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    form.reset()
  
    promise
      .then(() => {
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay} ms`,
          messageColor: "#FFF",
          messageSize: "16px",
          position: "topRight",
          backgroundColor: "#59A10D",
          close: false,
        });
      })
      .catch(() => {
        iziToast.show({
          message: `❌ Rejected promise in ${delay} ms`,
          messageColor: "#FFF",
          messageSize: "16px",
          position: "topRight",
          backgroundColor: "#EF4040",
          close: false
        });
      });

  });