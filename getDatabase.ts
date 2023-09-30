import { MongoClient, ObjectId } from "mongodb"
import { botCall } from "./discordBot";

export const updateDatabase = async ( 
  { currentFeed } : { currentFeed: string[] }
  
  ) => {

  console.time('Getting database up to date');
  const client = new MongoClient( process.env.mongoURI! );

  try{
    const iek = client.db('iek').collection('feed');

    const cursor = iek.aggregate(pipeline);
    const entries:feedEntry[] = [];

    for await ( const entry of cursor ){

      entries.push( entry as unknown as feedEntry );

    }

    //must be after reading the cursor
    const entriesContent = entries.map( entry => entry.textContent ); 

    const newEntries: feedEntry[] = currentFeed
      .filter( 
        feedItem => !entriesContent?.includes(feedItem)
      )
      .map( newEntry => ({
        _id: new ObjectId(),
        textContent: newEntry,
        discovery_date: new Date
      }))

      console.log(newEntries)
    return;
    

    if ( newEntries.length > 0 ){

      for ( const newEntry of newEntries ){
        await botCall( { content: newEntry.textContent } );
        console.log( await iek.insertOne( newEntry ) );
      }
      
      
      
    }
    else{
      console.log( 'No new entries.' );
    }

  }
  catch(error){
    console.error(error);
  }
  finally{
    console.timeEnd( 'Getting database up to date' );
    client.close();
  }
}

const pipeline = [
  {
    $sort: {
      discovery_date: -1
    }
  },
  {
    $limit: 10
  }
];

type feedEntry = {
  _id: ObjectId,
  textContent: string,
  discovery_date: Date
}