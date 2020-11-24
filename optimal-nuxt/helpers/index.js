import _ from 'lodash';

export const AritmeticMean = (vote, total) => {

  let _sum = _.reduce(vote, (acc, item) => {
    return acc + parseInt(item.mark || 0)
  }, 0);

  return _sum > 0 ? _sum / total : 0;
};


export const CalculateChoices = (survey) => {
  let items = [];

  if (survey) {
    items.push(_.filter(survey.choices, (item) => {
      if (item.status === "1") {
        return item;
      }
    }));
    let data = [];
    data.push(_.map(items[0], (x) => {
      let item = { ...x };
      item.votes = _.uniqBy(item.votes, 'user_id');
      let legends = [];
      let votesCount = item.votes.length;
      let score = Score(item, votesCount);
      legends.push(item.choice_title, score > 0 ? score : 0);
      return legends;
    }));

    let newData = data[0];
    newData.sort((a, b) => {
      return a[1] - b[1]
    });
    newData.push(['VoteName', 'VoteCount']);

    return data[0].reverse();
  }
};

export const RateCalculate = (rate, chartData) => {
  let total = _.reduce(chartData, (acc, item, index) => {
    if (index !== 0) {
      acc = acc + item[1];
    }
    return acc;
  }, 0);
  return (rate / total * 100).toFixed(2);
}

export const Score = (item, votesCount) => {
  let arithmeticMean = AritmeticMean(item.votes, votesCount);
  return arithmeticMean * Math.sqrt(votesCount / (votesCount + Math.sqrt(votesCount)));
};

export const linkify = (inputText) => {
  let replacedText, replacePattern1, replacePattern2, replacePattern3, replacePattern4;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText;
};
