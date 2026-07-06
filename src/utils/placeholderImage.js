// Generates a local SVG placeholder as a data URI — no network request needed.
export const getPlaceholderImage = (label = "Amaravati Times") => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <rect width="800" height="450" fill="#f3f3f3"/>
      <rect x="0" y="0" width="800" height="6" fill="#C8102E"/>
      <text x="50%" y="50%" font-family="Georgia, serif" font-size="28" fill="#999"
        text-anchor="middle" dominant-baseline="middle">${label}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};