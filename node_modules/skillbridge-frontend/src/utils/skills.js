export const parseSkillsFromText = (text) => {
  if (!text || typeof text !== 'string') return [];
  return text
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
};

export const skillsToText = (skills) => {
  if (!Array.isArray(skills)) return '';
  return skills.join(', ');
};
