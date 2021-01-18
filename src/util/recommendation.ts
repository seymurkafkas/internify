function getMatchPercentage(reference, incoming) {
  if (reference.length < 1) {
    return 50;
  }
  const seen = {};
  for (let i = 0; i < reference.length; i++) {
    seen[reference[i].skill] = -1;
  }
  for (let i = 0; i < incoming.length; i++) {
    if (seen[incoming[i].skill] === undefined) {
      continue;
    }

    const thatBetter = parseInt(incoming[i].level) - parseInt(reference[i].level);
    const mult = range([-2, 2], [0.5, 1.2], thatBetter);
    seen[incoming[i].skill] = mult;
  }

  //get elems which are seen
  let matchedScore = 0;
  Object.keys(seen).forEach((k) => {
    if (seen[k] != -1) {
      matchedScore += seen[k];
    }
  });

  matchedScore = range([0, 3], [0.5, 1], matchedScore);

  return matchedScore * 100;
}

function range(from, to, s) {
  return to[0] + ((s - from[0]) * (to[1] - to[0])) / (from[1] - from[0]);
}

export function getListingScore(stud, ling, avgComp) {
  // compensation ortalamadan ne kadar yüksek
  const ratio = Math.abs(ling.compensation - avgComp) / avgComp;
  let compPercent = range([0.1, 1.5], [1, 95], ratio);
  if (ratio > 1.5) {
    compPercent = 95 + ratio;
  }

  //   console.log("ling.compensation, avgComp");
  //   console.log(ling.compensation, avgComp);
  //   const compPercent = Math.random() * 70 + 20;

  // requirements yüzde kaç match ediyor
  //   console.log("ling, stud");
  //   console.log(ling, stud);
  //   console.log(ling.requirements, stud.skills);
  const matchPercent = getMatchPercentage(ling.requirements, stud.skills);
  //   const matchPercent = Math.random() * 60 + 30;

  // lokasyon ne kadar yakın
  const locationBonus = stud.location.city === ling.location.city ? 1 : 0;
  //   const locationBonus = Math.abs(Math.random()) * 100;

  // ilan ne kadar süredir aktif
  const now = new Date();
  const dayInSec = 60 * 60 * 24;
  console.log("ling", ling);
  const dayPassed = Math.floor((now.getTime() / 1000 - ling.timestamp.seconds) / dayInSec);
  console.log("dayPassed", dayPassed);

  const activeForPercent = range([1, 60], [100, 1], dayPassed);

  // kaç kişi başvurdu
  const applicantsPercent = range([0, 60], [1, 100], ling.applicationCount);

  //comp 30
  //matchPercent 60
  //activeFor 10
  //appliedTimes 10

  //   console.log("compPercent, matchPercent, activeForPercent, appllicantsPercent");
  //   console.log(compPercent, matchPercent, activeForPercent, appllicantsPercent);
  return (
    (compPercent * 30 + matchPercent * 60 + activeForPercent * 10 + applicantsPercent * 10 + locationBonus * 10) / 100
  );
}

export function getAverageCompensation(lings) {
  let sum = 0;
  lings.forEach((ling) => {
    sum += ling.compensation;
  });

  return sum / lings.length;
}