import sampleData from './sampleData';

const delay = ms=> new Promise(resolve=>setTimeout(resolve,ms));

export const fetchSampleData = ()=>{
    return delay(2000).then(()=>{
        return Promise.resolve(sampleData);
    })
}