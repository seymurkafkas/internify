function findSkillLevelInReference(reference, skill) {
  for (let i = 0; i < reference.length; i++) {
    if (reference[i].skill === skill) {
      return reference[i].level;
    }
  }
}

function getMatchPercentage(reference, incoming) {
  if (reference.length < 1 || incoming.length < 1) {
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
    const thatBetter = parseInt(incoming[i].level) - parseInt(findSkillLevelInReference(reference, incoming[i].skill));
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

  // requirements yüzde kaç match ediyor
  const matchPercent = getMatchPercentage(ling.requirements, stud.skills);

  // lokasyon ne kadar yakın
  let locationBonus = false;
  if (stud.location?.city && ling.location.city) {
    locationBonus = stud.location.city === ling.location.city;
  }

  // ilan ne kadar süredir aktif
  const now = new Date();
  const dayInMs = 60 * 60 * 24 * 1000;
  const lingDate = ling.createdAt.toDate();
  const dayPassed = Math.floor((now.getTime() - lingDate.getTime()) / dayInMs);
  const activeForPercent = range([1, 60], [100, 1], dayPassed);

  // kaç kişi başvurdu
  const applicantsPercent = range([0, 60], [1, 100], ling.applicationCount);

  return (
    (compPercent * 30 +
      matchPercent * 60 +
      activeForPercent * 10 +
      applicantsPercent * 10 +
      Number(locationBonus) * 10) /
    100
  );
}

/* istanbul ignore next */
export function getAverageCompensation(lings) {
  let sum = 0;
  lings.forEach((ling) => {
    sum += ling.compensation;
  });

  return sum / lings.length;
}
