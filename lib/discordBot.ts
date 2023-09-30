
export const botCall = async( { content, channel } : { content: string, channel: string } ) => {
  
  const url = `https://discord.com/api/v10/channels/${channel}/messages`;

  const messageSend = await fetch(url,{
    method: "POST",
    headers:[
      ["Authorization",`Bot ${String(process.env.botToken)}`],
      // ["Content-Type", "application/json"]
    ],
    body: JSON.stringify( { content } )
  });

  if ( messageSend.ok ){
    console.log(` Successfully sent '${content}' to the channel. `);
  }
  else{ 
    throw ` There was an error sending '${content}'. `;
  }
  
}


//Add the bot to servers with the following url
// https://discord.com/oauth2/authorize?client_id=1157426303813828778&scope=bot&permissions=2048
// (paste in browser)