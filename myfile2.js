const readline=require('readline');// using readline
const fs=require('fs');//using fs
      const rl = readline.createInterface({
      input: fs.createReadStream('./Crimes_-_2001_to_present.csv') //Read CSV file.
       });
       function remove(array,element){
         return array.filter(e=>e!==element);  //function to remove irrelevant commas
       }
const vehicle = new Array(16);//array of counters for given time frame 2001-2016
const property = new Array(16);
const statesup = new Array(16);
vehicle.fill(0);
property.fill(0);
statesup.fill(0);
const hasvehicle = /TO PROPERTY/;
const hasprop = /TO VEHICLE/;
const hasstate = /TO STATE SUP PROP/;
const has = /CRIMINAL DAMAGE/;
rl.on('line', (line) => {
  let index;
  let x;
  if (has.test(line)) {
    if (hasvehicle.test(line)) {
      x = line.split(',');
      for (let i = 0; i < x.length; i++) {
        if (Number(x[i]) > 2000 && Number(x[i]) < 2017) {
          index = Number(x[i]);
          break;
        }
      }
      vehicle[index - 2001] += 1;//(index-2001) as index 0 refers to the year 2001
    }
    if (hasstate.test(line)) {
      x = line.split(',');
      for (let i = 0; i < x.length; i++) {
        if (Number(x[i]) > 2000 && Number(x[i]) < 2017) {
            index = Number(x[i]);
          break;
        }
      }
      statesup[index - 2001] += 1;
    }
    if (hasprop.test(line)) {
      x = line.split(',');
      for (let i = 0; i < x.length; i++) {
        if (Number(x[i]) > 2000 && Number(x[i]) < 2017) {
          index = Number(x[i]);
          break;
        }
      }
      property[index - 2001] += 1;
    }
  }
});
rl.on('close', () => {
  const v = [];
  for (let i = 0; i < vehicle.length; i++) {
    const type = {
      Year: '',
      Property: '',
      Vehicle: '',
      State: '',
    };
    type.Year = i + 2001;
    type.Property = property[i];
    type.State = statesup[i];
    type.Vehicle = vehicle[i];
    v.push(type);
  }
       console.log(v);
          var myJSON1 = JSON.stringify(v)       //JSON creation

          fs.writeFile("output2.json", myJSON1, 'utf8', function (err) {
              if (err) {
                  console.log("An error occured while writing JSON Object to File.");
                  return console.log(err);
              }
             });
              console.log("JSON2 file has been saved.");
          });
