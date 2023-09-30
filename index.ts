import { MongoClient } from "mongodb";
import { getLatestFeed } from "./lib/getFeed";
import { getCurrentDatabase } from "./lib/getDatabase";
import { updateMedia } from "./lib/updateMedia";

console.time( 'Program run time' );
const channel = "1130821267314978972";

( async()=>{
  
  const currentFeed = await getLatestFeed();

  if ( currentFeed ){

    const client = new MongoClient( process.env.mongoURI! );

    try{

      const latestDbDocuments = await getCurrentDatabase( { client: client });

      if ( latestDbDocuments ) {

        await updateMedia( { 
          client: client,
          currentFeed: currentFeed,
          latestDbDocuments: latestDbDocuments,
          channel: channel
        } )

        console.log( ` Successfully sent all new content! ` );

      }
      else{

        console.warn( `Couldn't get answer from the database` );
        
      }
      
    }
    catch(error){
      console.error( error );


    }    

    finally{

      client.close();
      console.timeEnd('Program run time');

    }

  }
  else{
    console.error( `Couldn't get the feed.`);
    console.timeEnd('Program run time');
  }


})()