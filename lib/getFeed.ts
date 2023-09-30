import * as cheerio from 'cheerio';

export const getLatestFeed = async() => {

  const $ = await fetch('https://giekperi.sites.sch.gr')
    .then( async( website ) => website ? cheerio.load(await website.text()) : null);

  if ( $ ) {

    const posts = cheerio.load($( '#uid_5067a9641 > div.content-wrap > div' ).first().children().toString());
    const entries = posts( 'h2' ).text()
      .split( /\s{3,}/ )
      .filter( entry => entry != '' );

    return entries.length > 0? entries :null;
      
  }

  return null;

}
