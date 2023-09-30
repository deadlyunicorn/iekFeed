import { MongoClient } from "mongodb"
import { feedEntry } from "../types/feed";

export const getCurrentDatabase = async ( 
  { client } : 
  { 
    client: MongoClient 
  }
  
  ) => {

  console.time( 'Getting database items' );

  try{
    const iek = client.db('iek').collection('feed');

    const cursor = iek.aggregate(pipeline);
    const entries:feedEntry[] = [];

    for await ( const entry of cursor ){

      entries.push( entry as unknown as feedEntry );

    }

    //must be after reading the cursor
    return entries;


  }
  catch(error){
    console.error(error);
  }
  finally{
    console.timeEnd( 'Getting database items' );
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

