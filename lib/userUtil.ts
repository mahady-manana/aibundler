export function createDefaultUsername(name: string) {
  const sanitizedName = name.trim().toLowerCase().replace(/\s+/g, "");
  const rn = Math.floor(100000 + Math.random() * 900000);
  if (sanitizedName.length === 0) return "user_" + rn;
  return sanitizedName + "_" + rn;
}

export function createDefaultUrl(project: string) {
  const sanitizedName = project.trim().toLowerCase().replace(/\s+/g, "-");
  const rn = Math.floor(100000 + Math.random() * 900000);
  if (sanitizedName.length === 0) return "project_" + rn;
  return sanitizedName + "-" + rn;
}
