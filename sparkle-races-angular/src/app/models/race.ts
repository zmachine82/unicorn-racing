export class Race {
    id!: number;
    name!: string;
    startTime!: Date;
    result: any;

    constructor(raceJson: any) {
        this.id = raceJson.id;
        this.name = raceJson.name;
        this.startTime = new Date(raceJson.start_ts);
        this.result = raceJson.race_result;
    }

    get isFinished() {
        return !!this.result
    }

    get timeUntilStart() {
        return this.isFinished ? null : (convertMsToTime(this.startTime.getTime() - new Date().getTime()))
    }

    get timeStatus() {
        return this.isFinished ? "Finished" : this.timeUntilStart
    }
}


function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  function convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    // hours = hours % 24;
  
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds,
    )}`;
  }