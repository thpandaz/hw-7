import assert from "node:assert";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";

const compare =  (num1, num2) => {
  const epsilon = 0.002; // increase for repeated storing & rounding
  return  Math.abs(num1 - num2) <= epsilon;
};


test("fetchLongitudeAndLatitude follows type specification", () => {
  const promise = fetchLongitudeAndLatitude(
    "University of Massachusetts Amherst"
  );
  assert(typeof promise === "object" && typeof promise.then === "function");
  return promise.then((result) => {
    assert(typeof result === "object"); //  Assert the result is an object
    assert(typeof result.lon === "number"); // Assert that the lon value is a number
    assert(typeof result.lat === "number"); // Assert that the lat value is a number
    assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
  });
});

test("fetchLongitudeAndLatitude return the correct data", () => {
  const promise = fetchLongitudeAndLatitude(
    "University of Massachusetts Amherst"
  );
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(compare(result.lat, 42.3869382));
    assert(compare(result.lon, -72.52991477067445));
  });
});

test("fetchLongitudeAndLatitude return the first data", () => {
  const promise = fetchLongitudeAndLatitude(
    "Amherst"
  );
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(compare(result.lat, 42.3685658));
    assert(compare(result.lon, -72.505714));
  });
});

test("fetchLongitudeAndLatitude throw new error if empty", () => {
  const promise = fetchLongitudeAndLatitude(
    "Random thing"
  );
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(result instanceof Error);
  });
});