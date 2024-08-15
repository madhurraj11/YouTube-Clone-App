import axios from 'axios';
import { convertRawtoString } from './convertRawtoString';
import { parseVideoDuration } from './parseVideoDuration';
import { timeSince } from './timeSince';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const parseRecommendedData = async(items) => {

  try{
    const videoIds = [];
    const channelIds = [];

    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });

    const {
      data: {items :channelsData},
    } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(
    ","
  )}&key=${API_KEY}`);

    console.log("channelsData",channelsData);
    const parsedChannelsData =[];
  channelsData.forEach((channel)=> parsedChannelsData.push({
    id:channel.snippet.channelId,
    image:channel.snippet.thumbnails.default.url,
  }));

  const {
    data:{items:videosData},
  } = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
      ","
    )}&key=${API_KEY}`
  );
  

  const parseData = [];
  items.forEach((item,index) => {
    const channelData = parsedChannelsData.find((data)=>data.id === item.snippet.channelId);
    if(channelData){
      parseData.push({
        videoId : item.id.videoId,
        videoTitle: item.snippet.title,
        videoDescription:item.snippet.description,
        videoThumbnail:item.snippet.thumbnails.medium.url,
        videoLink:`https://www.youtube.com/watch?v=${item.id.videoId}`,
        videoDuration:parseVideoDuration(
          videosData[index]?.contentDetails?.duration || ""
        ),
        videoViews:convertRawtoString(
          videosData[index]?.statistics?.viewCount || 0
        ),
        videoAge:timeSince(new Date(item.snippet.publishedAt)
        ),
        channelInfo:{
          id:item.snippet.channelId,
          image:channelData.image,
          name:item.snippet.channelTitle
        },
      });
      }else {
        console.warn(`Channel data not found for channel ID: ${item.snippet.channelId}`);
    }
    });

    return parseData;
  }
  catch(error){
    console.error(error);
  }
};
