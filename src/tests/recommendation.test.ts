import firebase from "firebase";
import * as Recommendation from "../util/recommendation";
const Timestamp = firebase.firestore.Timestamp;

describe("getListingScore", () => {
  const testCases = [
    {
      input: [
        {
          location: { city: "Istanbul", country: "Turkey" },
          skills: [
            { skill: "React", level: "3" },
            { skill: "Java", level: "3" },
          ],
        },
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 3,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [{ skill: "Typescript", level: "2" }],
          deadline: null,
          createdAt: new Timestamp(2000, 999995533),
          compensation: 1320,
        },
        3000,
      ],
    },
    {
      input: [
        {
          location: { city: "New York", country: "USA" },
          skills: [
            { skill: "React", level: "3" },
            { skill: "Java", level: "3" },
          ],
        },
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 66,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [{ skill: "React", level: "2" }],
          deadline: null,
          createdAt: new Timestamp(2000, 999995533),
          compensation: 8888,
        },
        3000,
      ],
    },
    {
      input: [
        {
          location: { city: "New York", country: "USA" },
          skills: [],
        },
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 66,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [],
          deadline: null,
          createdAt: new Timestamp(2000, 999995533),
          compensation: 8888,
        },
        3000,
      ],
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should yield a score out of 100`, () => {
      const result = Recommendation.getListingScore(testCase.input[0], testCase.input[1], testCase.input[2]);
      expect(result).toBeLessThanOrEqual(100);
    });
  });
});
