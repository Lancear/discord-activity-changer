import connectToDiscord from './discord-connection.js';

const require = (await import('module')).createRequire(import.meta.url);
const config = require('../config.json');

try {
  console.log('1. ✨ Start this app and authorise it ✨');
  console.log();

  console.log('🔌 Connecting to Discord...');
  const discordConn = await connectToDiscord(config);

  config.channel_ids.map(
    channel_id => discordConn.subscribe('MESSAGE_CREATE', { channel_id })
  );

  discordConn.on('', (payload) => {
    if (payload.evt !== 'MESSAGE_CREATE') return;
    if (
      config.user_ids.length === 0 ||
      config.user_ids.includes(payload.data.message.author.id)
    ) return;

    console.log("🔁 Changing Activity...");
    const img = `${Math.min(Math.floor(Math.random() * config.activity.nr_of_images) + 1, config.activity.nr_of_images)}`;
    console.log("Image", img);
    discordConn.setActivity({
      details: config.activity.details,
      state: config.activity.state,
      assets: {
        large_image: img,
        large_text: config.activity.image_text,
      },
    });
  });

  console.log("🔁 Changing Activity...");
  const img = `${Math.min(Math.floor(Math.random() * 37) + 1, 37)}`;
  console.log("Image", img);
  discordConn.setActivity({
    details: "Chillin' & Vibin'",
    state: "Hellö 👋",
    assets: {
      large_image: img,
      large_text: "YOOOW!",
    },
  });
}
catch (err) {
  console.error(err);
}



