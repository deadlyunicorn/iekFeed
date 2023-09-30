import { MongoClient, ObjectId } from "mongodb";
import { feedEntry } from "../types/feed";
import { botCall } from "./discordBot";

export const updateMedia = async( 
  { client, currentFeed, latestDbDocuments, channel }:
  { 
    client: MongoClient, currentFeed: string[], 
    latestDbDocuments: feedEntry[],
    channel: string
  }
  ) => {

  const iek = client.db('iek').collection('feed');
  const textArrayFromDatabase = latestDbDocuments.map( entry => entry.textContent ); 

  const newEntries: feedEntry[] = currentFeed
      .filter( 
        feedItem => !textArrayFromDatabase?.includes(feedItem)
      )
      .map( newEntry => ({
        _id: new ObjectId(),
        textContent: newEntry,
        discovery_date: new Date
      }))
      .reverse();


    if ( newEntries.length > 0 ){

      for ( const newEntry of newEntries ){

        await botCall( { content: newEntry.textContent, channel: channel } );
        console.log( await iek.insertOne( newEntry ) );

      }

    }
    else{
      console.log( 'No new entries.' );
    }
}