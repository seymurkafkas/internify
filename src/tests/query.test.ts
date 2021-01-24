import { keywordMatchesListing } from "../util/query";

describe("keywordMatchesData", () => {
  const testCases = [
    {
      input: [
        "",
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 3,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [{ skill: "Typescript", level: "2" }],
          deadline: null,
          compensation: 1320,
        },
      ],
      output: true,
    },
    {
      input: [
        "react",
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 3,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [{ skill: "Typescript", level: "2" }],
          deadline: null,
          compensation: 1320,
        },
      ],
      output: true,
    },
    {
      input: [
        "blue",
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 3,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [{ skill: "Typescript", level: "2" }],
          deadline: null,
          compensation: 1320,
        },
      ],
      output: true,
    },
    {
      input: [
        "perseverance",
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 3,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [{ skill: "Typescript", level: "2" }],
          deadline: null,
          compensation: 1320,
        },
      ],
      output: true,
    },
    {
      input: [
        "istanbul",
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 3,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [{ skill: "Typescript", level: "2" }],
          deadline: null,
          compensation: 1320,
        },
      ],
      output: true,
    },
    {
      input: [
        "turkey",
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 3,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [{ skill: "Typescript", level: "2" }],
          deadline: null,
          compensation: 1320,
        },
      ],
      output: true,
    },
    {
      input: [
        "typescript",
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 3,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [{ skill: "Typescript", level: "2" }],
          deadline: null,
          compensation: 1320,
        },
      ],
      output: true,
    },
    {
      input: [
        "someirrelevantinput",
        {
          title: "React Wizard",
          companyName: "Blue Origin",
          location: { city: "Istanbul", country: "Turkey" },
          applicationCount: 3,
          description: "We only accept individuals with exceptional drive and perseverance.",
          requirements: [{ skill: "Typescript", level: "2" }],
          deadline: null,
          compensation: 1320,
        },
      ],
      output: false,
    },
    {
      input: [
        "someirrelevantinput",
        {
          title: "",
          companyName: "",
          location: { city: "", country: "" },
          applicationCount: 0,
          description: "",
          requirements: [{ skill: "", level: "" }],
          deadline: null,
          compensation: 1320,
        },
      ],
      output: false,
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should return true if keyword matches listing data`, () => {
      const result = keywordMatchesListing(testCase.input[0] as string, testCase.input[1] as any);
      expect(result).toEqual(testCase.output);
    });
  });
});
