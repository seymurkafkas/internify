import * as StringUtil from "../util/string";

describe("isEmailValid", () => {
  const testCases = [
    {
      input: "seymurkafkas@gmail.com",
      output: true,
    },
    {
      input: "",
      output: false,
    },
    {
      input: "mertburan",
      output: false,
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should return that the email ${testCase.input} ${testCase.output ? "Valid" : "Invalid"}`, () => {
      const result = StringUtil.isEmailValid(testCase.input);
      expect(result).toEqual(testCase.output);
    });
  });
});

describe("areEqual", () => {
  const testCases = [
    {
      input: ["122334pass", "122334pass"],
      output: true,
    },

    {
      input: ["xyz", "122334pass"],
      output: false,
    },
    {
      input: ["", "122334pass"],
      output: false,
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should return that the values are equal or unequal `, () => {
      const result = StringUtil.areEqual(testCase.input[0], testCase.input[1]);
      expect(result).toEqual(testCase.output);
    });
  });
});

describe("formatName", () => {
  const testCases = [
    {
      input: "Seymur Kafkas",
      output: "Seymur Kafkas",
    },
    {
      input: "",
      output: "Undeclared",
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should format the name`, () => {
      const result = StringUtil.formatName(testCase.input);
      expect(result).toEqual(testCase.output);
    });
  });
});

describe("formatTitle", () => {
  const testCases = [
    {
      input: "Software Engineering",
      output: "Software Engineering",
    },
    {
      input: "",
      output: "Undeclared",
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should format the title`, () => {
      const result = StringUtil.formatTitle(testCase.input);
      expect(result).toEqual(testCase.output);
    });
  });
});

describe("formatEducation", () => {
  const testCases = [
    {
      input: [{ degreeName: "Engineering", institutionName: "ITU" }],
      output: "Engineering at ITU",
    },
    {
      input: [{ degreeName: "", institutionName: "ITU" }],
      output: "Studied at ITU",
    },
    {
      input: [{ degreeName: "Chemistry", institutionName: "" }],
      output: "Chemistry",
    },
    {
      input: [{ degreeName: "", institutionName: "" }],
      output: "Undeclared",
    },
    {
      input: [],
      output: "Undeclared",
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should format the education details`, () => {
      const result = StringUtil.formatEducation(testCase.input);
      expect(result).toEqual(testCase.output);
    });
  });
});

describe("formatPosition", () => {
  const testCases = [
    {
      input: [{ positionName: "Lead Engineer", companyName: "Proficient" }],
      output: "Lead Engineer at Proficient",
    },
    {
      input: [{ positionName: "", companyName: "ITU" }],
      output: "Works at ITU",
    },
    {
      input: [{ positionName: "Chemist", companyName: "" }],
      output: "Chemist",
    },
    {
      input: [{ positionName: "", companyName: "" }],
      output: "Undeclared",
    },
    {
      input: [],
      output: "Undeclared",
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should format the company details`, () => {
      const result = StringUtil.formatPosition(testCase.input);
      expect(result).toEqual(testCase.output);
    });
  });
});

describe("formatLocation", () => {
  const testCases = [
    {
      input: { city: "Istanbul", country: "" },
      output: "Istanbul",
    },
    {
      input: { city: "", country: "Turkey" },
      output: "Turkey",
    },
    {
      input: { city: "Istanbul", country: "Turkey" },
      output: "Istanbul, Turkey",
    },
    {
      input: { city: "", country: "" },
      output: "Undeclared",
    },
  ];

  testCases.forEach((testCase) => {
    test(`Should format the location details`, () => {
      const result = StringUtil.formatLocation(testCase.input);
      expect(result).toEqual(testCase.output);
    });
  });
});
