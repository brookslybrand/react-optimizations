import uuid from 'uuid/v4';

const N = 10;

// https://baconipsum.com/
const bacon = [
  'Bacon ipsum dolor amet burgdoggen kevin doner, capicola picanha turkey chicken buffalo pork loin meatball. Tongue jerky fatback porchetta ham ribeye hamburger flank, kielbasa salami cupim kevin drumstick strip steak boudin.',
  'Strip steak jowl pork, shoulder kielbasa short loin chuck venison corned beef hamburger beef ribs shankle. T-bone buffalo porchetta meatball, shank biltong cupim spare ribs short ribs prosciutto ham hock turducken bresaola.',
  'Shank cupim swine ham hock meatball, pork tail brisket shoulder burgdoggen venison. Burgdoggen meatloaf sausage buffalo prosciutto cow spare ribs short loin shank bresaola boudin pork. Pastrami pork loin jowl beef ribs leberkas, pork corned beef t-bone turducken spare ribs porchetta.',
  'Boudin pork loin tenderloin ham hock jerky ribeye. Turkey porchetta brisket ribeye chuck shank pastrami andouille frankfurter spare ribs prosciutto pork belly salami fatback short loin. Cow ball tip bresaola brisket.',
  'Salami alcatra buffalo frankfurter filet mignon jerky meatloaf beef ribs doner cow andouille. Jowl beef short loin ham. Tongue corned beef tenderloin, ham hock prosciutto turkey sirloin doner fatback beef porchetta boudin.',
];

const getProgrammingOptions = () => ({
  react: { label: 'React', value: false },
  vue: { label: 'Vue.js', value: false },
  jquery: { label: 'jQuery', value: false },
});

const getAnimalOptions = () => ({
  react: { label: 'Lions', value: false },
  vue: { label: 'Tigers', value: false },
  jquery: { label: 'Bears', value: false },
});

export default Array.from({ length: N }).map((_, i) => ({
  id: uuid(),
  title: `Title ${i}`,
  body: bacon[i % 5],
  options: i % 2 ? getProgrammingOptions() : getAnimalOptions(),
}));
