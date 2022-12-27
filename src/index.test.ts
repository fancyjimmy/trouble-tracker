import {describe, it, expect} from 'vitest';
import {BasicExtractor} from "./lib/extractor/BasicExtractor";


// test the BasicExtractor



// test the filler words from the BasicExtractor
describe('BasicExtractor', () => {
    it('should return an array of filler words', async () => {
        const extractor = new BasicExtractor();
        const fillerText = `
        Speedrunning is the act of playing a video game, or section of a video game, with the goal of completing it as fast as possible. Speedrunning often involves following planned routes, which may incorporate sequence breaking and can exploit glitches that allow sections to be skipped or completed more quickly than intended. Tool-assisted speedrunning is a sub-category of speedrunning that uses emulation software to slow the game down and create a precisely controlled sequence of inputs.
        Many online communities develop around speedrunning specific games; community leaderboard rankings for individual games form the primary competitive metric for speedrunning. Racing between two or more speedrunners is also a popular form of competition. Videos and livestreams of speedruns are shared via the internet on media sites such as YouTube and Twitch. Speedruns are sometimes showcased at marathon events, which are gaming conventions that feature multiple people performing speedruns in a variety of games. 
        `;
        console.log(await extractor.extract(fillerText));
    });
});
