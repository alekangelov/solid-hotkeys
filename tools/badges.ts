import {
  BadgeEntries,
  BadgesConfig,
  BadgesOptions,
  renderBadges,
} from 'badges';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

// Listing of badges to output
const list: BadgeEntries = [
  'nodeico',
  '---',
  '---',

  // Development Badges
  'npmversion',
  'npmdownloads',
  '---',
  'twitterfollow',
];

// Configuration for the badges
const config: BadgesConfig = {
  npmPackageName: 'solid-hotkeys',

  saucelabsUsername: 'alekangelov',
  twitterUsername: 'goukistrife',
  githubSlug: 'alekangelov/solid-hotkeys',
  nodeicoQueryString: { downloads: true, compact: true, height: 2 },

  homepage: 'https://alekangelov.github.io/solid-hotkeys/',
};

// Options for rendering the badges
const options: BadgesOptions = {
  // Filter Category
  // When set to a string, will only render badges from the list that of the specified category
  // Values can be 'development', 'testing', 'funding', or 'social'
  // E.g. to render only funding badges, set to 'funding'
  filterCategory: false,

  // Filter Scripts
  // When true, do not render any badges from the list that are scripts
  filterScripts: false,
};

// Render the badges to a string
const result = renderBadges(list, config, options);
console.log('______ COPY THIS BELOW ______\n');
console.log(result);
console.log('\n______ COPY THIS ABOVE ______');

const badgePath = path.resolve(__dirname, 'badges.html');

fs.writeFileSync(badgePath, result);

exec(`open -a "Google Chrome" ${badgePath}`, (err, stdOut, stdErr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdOut);
  console.error(stdErr);
});
