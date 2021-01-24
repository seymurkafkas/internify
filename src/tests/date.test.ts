import * as DateUtil from "../util/date";
import firebase from "firebase";

const Timestamp = firebase.firestore.Timestamp;
describe("stringifyDate", () => {
  const testCases = [
    {
      input: new Date(1995, 11, 19),
      output: "19 December 1995",
    },
    {
      input: null,
      output: "Undeclared",
    },
  ];

  testCases.forEach((test) => {
    it(`should transform date ${test.input} to string, which is: ${test.output}`, () => {
      const result = DateUtil.stringifyDate(test.input);
      expect(result).toEqual(test.output);
    });
  });
});

describe("enrolledItemTransformDate", () => {
  const testCases = [
    {
      input: [
        {
          range: [null, null],
        },
      ],
      output: [
        {
          range: [null, null],
        },
      ],
    },
    {
      input: [
        {
          range: [new Timestamp(199, 889885553), null],
        },
      ],
      output: [
        {
          range: [new Timestamp(199, 889885553).toDate(), null],
        },
      ],
    },
  ];

  testCases.forEach((test) => {
    it(`should transform date ${test.input} to string, which is: ${test.output}`, () => {
      DateUtil.enrolledItemTransformDate(test.input);
      expect(test.input).toEqual(test.output);
    });
  });
});
