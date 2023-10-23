const responses = require('../messages.json');

function handleMessageResponse(message) {
  const content = message.content.toLowerCase();

  // Sort triggers by length (from longest to shortest)
  const sortedTriggers = Object.keys(responses).sort(
    (a, b) => b.length - a.length,
  );

  for (const keyword of sortedTriggers) {
    if (content.includes(keyword)) {
      const response = responses[keyword];

      switch (response.type) {
        case 'text':
          message.channel.send(response.content, { tts: response.tts });
          break;
        case 'image':
          message.channel.send({ files: [response.content] });
          break;
      }

      break; // Stop processing triggers once a match is found
    }
  }
}

module.exports = handleMessageResponse;
